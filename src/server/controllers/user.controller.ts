import { QueryConfig } from "pg";
import { User } from "../shared/user";
import { PartialResultList } from "../shared/partial-result-list";
import { SearchArgument } from "../shared/search-argument";
import { QueryNames } from "./query-names";
import { DbClient } from "../db-client";
import * as bcrypt from "bcrypt";
import { UserServiceInterface } from "../shared/user-service-interface";

export class UserController implements UserServiceInterface {
    public defaultSortColumn: string = 'email';
    public sortColumnOptions: string[] = ['email', 'fullname'];

    public async search(argument: SearchArgument): Promise<PartialResultList<User>> {
        let countQuery: QueryConfig = {
            name: QueryNames.UserTableSearchCount,
            text: `SELECT COUNT(*) FROM users 
            WHERE upper(email) LIKE upper($1) OR upper(fullname) LIKE upper($1)`,
            values: ['%' + argument.query + '%']
        };

        let countResult = await DbClient.Instance().query(countQuery);

        let total = countResult[0]['count'];

        if (total <= argument.skip) {
            argument.skip = 0;
        }

        let selectQuery: QueryConfig = {
            name: QueryNames.UserTableSearch,
            text: `SELECT * FROM users
            WHERE upper(email) LIKE upper($1) OR upper(fullname) LIKE upper($1)
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

    public async create(user: User, password: string): Promise<number> {
        let hashedPassword = await bcrypt.hashSync(password, 10);

        let query: QueryConfig = {
            name: QueryNames.UserTableCreate,
            text: "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING id",
            values: [user.fullname, user.email, hashedPassword]
        };

        let result = await DbClient.Instance().query(query);
        let id = result[0]['id'] as number;
        user.id = id;
        return id;
    }

    public async remove(id: number): Promise<boolean> {
        let query: QueryConfig = {
            name: QueryNames.UserTableRemove,
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
            name: QueryNames.UserTableUpdate,
            text: "UPDATE users SET email = $1, fullname = $2 WHERE id = $3",
            values: [user.email, user.fullname, user.id]
        };

        await DbClient.Instance().query(query);
        return true;
    }
}
