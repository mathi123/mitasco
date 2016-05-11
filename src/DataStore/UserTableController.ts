import { QueryConfig } from "pg";
import { AbstractTableController } from "./AbstractTableController";
import { User } from "../DTOs/User";
import { PartialResultList } from "../DTOs/PartialResultList";
import { SearchArgument } from "../DTOs/SearchArgument";
import { QueryNames } from "./QueryNames";

export class UserTableController extends AbstractTableController {
    public defaultSortColumn: string = 'email';
    public sortColumnOptions: string[] = ['email', 'fullname'];

    constructor() {
        super();
    }

    public search(argument: SearchArgument, success: (results: PartialResultList<User>) => void, failed: (err: Error) => void): void {
        let countQuery: QueryConfig = {
            name: QueryNames.UserTable_SearchCount,
            text: `SELECT COUNT(*) FROM users 
            WHERE email LIKE $1 OR fullname LIKE $1`,
            values: ['%' + argument.query + '%']
        };

        this._client.query(countQuery, (err0, result0) => {
            if (err0) {
                failed(err0);
            } else {
                let total = result0.rows[0]['count'];
                if (total <= argument.skip) {
                    argument.skip = 0;
                }

                let selectQuery: QueryConfig = {
                    name: QueryNames.UserTable_Search,
                    text: `SELECT * FROM users 
            WHERE email LIKE $1 OR fullname LIKE $1 
            ORDER BY 
                CASE WHEN $3 = 0 THEN 
                    CASE WHEN $2 = 'email' THEN email
                         WHEN $2 = 'fullname' THEN fullname
                         ELSE fullname
                    END
                ELSE '' END ASC,
                CASE WHEN $3 = 1 THEN
                    CASE WHEN $2 = 'email' THEN email
                         WHEN $2 = 'fullname' THEN fullname
                         ELSE fullname
                    END
                ELSE '' END DESC
            OFFSET $4 LIMIT $5`,
                    values: ['%' + argument.query + '%', argument.sortColumn, argument.sortDirection, argument.skip, argument.take]
                };

                this._client.query(selectQuery, (err, result) => {
                    if (err) {
                        failed(err);
                    }
                    else {
                        let searchResult = new PartialResultList<User>();
                        searchResult.count = total;
                        searchResult.skipped = argument.skip;
                        searchResult.results = result.rows.map((row) => {
                            let rec = new User();
                            rec.id = row['id'];
                            rec.email = row['email'];
                            rec.fullname = row['fullname'];
                            return rec;
                        });

                        success(searchResult);
                    }
                });
            }
        });
    }
}
