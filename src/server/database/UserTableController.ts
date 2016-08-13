import { QueryConfig } from "pg";
import { User } from "../shared/User";
import { PartialResultList } from "../shared/PartialResultList";
import { SearchArgument } from "../shared/SearchArgument";
import { QueryNames } from "./QueryNames";
import { DbClient } from "./DbClient";

export class UserTableController {
    public defaultSortColumn: string = 'email';
    public sortColumnOptions: string[] = ['email', 'fullname'];

    public async search(argument: SearchArgument): Promise<PartialResultList<User>> {
        let countQuery: QueryConfig = {
            name: QueryNames.UserTable_SearchCount,
            text: `SELECT COUNT(*) FROM users 
            WHERE email LIKE $1 OR fullname LIKE $1`,
            values: ['%' + argument.query + '%']
        };

        let countResult = await DbClient.Instance().query(countQuery);

        let total = countResult[0]['count'];

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

        let selectResult = await DbClient.Instance().query(selectQuery);

        let searchResult = new PartialResultList<User>();
        searchResult.count = total;
        searchResult.skipped = argument.skip;
        searchResult.results = selectResult.map((row) => {
            let rec = new User();
            rec.id = row['id'];
            rec.email = row['email'];
            rec.fullname = row['fullname'];
            return rec;
                });
        return searchResult;
    }

    public async create(user: User): Promise<number> {
        let query: QueryConfig = {
            name: QueryNames.UserTable_Create,
            text: "INSERT INTO users (fullname, email) VALUES ($1, $2) RETURNING id",
            values: [user.fullname, user.email]
        };

        let result = await DbClient.Instance().query(query);

        return result[0]['id'];
    }

    public async remove(id: number): Promise<boolean> {
        let query: QueryConfig = {
            name: QueryNames.UserTable_Remove,
            text: "DELETE FROM users WHERE id = $1",
            values: [id]
        };

        await DbClient.Instance().query(query);

        return true;
    }

    public async read(id: number): Promise<User> {
        let query: QueryConfig = {
            name: QueryNames.UserTable_Read,
            text: "SELECT * FROM users WHERE id = $1",
            values: [id]
        };

        let result = await DbClient.Instance().query(query);
        let row = result[0];
        let rec = new User();
        rec.id = row['id'];
        rec.email = row['email'];
        rec.fullname = row['fullname'];
        return rec;
    }

    public async update(user: User): Promise<boolean> {
        let query: QueryConfig = {
            name: QueryNames.UserTable_Update,
            text: "UPDATE users SET email = $1, fullname = $2 WHERE id = $3",
            values: [user.email, user.fullname, user.id]
        };

        await DbClient.Instance().query(query);
        return true;
    }
}
