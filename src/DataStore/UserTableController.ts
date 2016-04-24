import { QueryConfig } from 'pg';
import { QueryResult } from 'pg';

import { AbstractTableController } from './AbstractTableController';
import { User } from '../DTOs/User';
import { SearchArgument } from '../DTOs/SearchArgument';
import { QueryNames } from './QueryNames';

export class UserTableController extends AbstractTableController {
    public defaultSortColumn: string = 'email';
    public sortColumnOptions: string[] = ['email', 'fullname'];

    constructor() {
        super();
    }

    public search(argument: SearchArgument, success: (results: User[]) => void, failed: (err: Error) => void): void {
        let preparedStatement: QueryConfig = {
            name: QueryNames.UserTable_Search,
            text:
            `SELECT * FROM users 
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

        let query = this._client.query(preparedStatement, (err, result) => {

            if (err) {
                failed(err);
            }
            else {
                let searchResult = result.rows.map((row) => {
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
}
