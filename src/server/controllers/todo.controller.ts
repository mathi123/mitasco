import { QueryConfig } from "pg";
import { PartialResultList } from "../shared/partial-result-list";
import { SearchArgument } from "../shared/search-argument";
import { QueryNames } from "./query-names";
import { DbClient } from "../db-client";
import { Todo } from "../shared/todo";
import { TodoService } from "../shared/todo.service";

export class TodoController implements TodoService {
    public async search(argument: SearchArgument): Promise<PartialResultList<Todo>> {
        console.debug("search");
        let countQuery: QueryConfig = {
            name: QueryNames.TodoTable_Search,
            text: `SELECT COUNT(*) FROM todo 
            WHERE description LIKE $1`,
            values: ['%' + argument.query + '%']
        };

        let countResult = await DbClient.Instance().query(countQuery);

        let total = countResult[0]['count'];

        if (total <= argument.skip) {
            argument.skip = 0;
        }

        let selectQuery: QueryConfig = {
            name: QueryNames.UserTable_Search,
            text: `SELECT * FROM todo
            WHERE description LIKE $1
            ORDER BY description ASC
            OFFSET $2 LIMIT $3`,
            values: ['%' + argument.query + '%', argument.skip, argument.take]
        };

        let selectResult = await DbClient.Instance().query(selectQuery);

        let searchResult = new PartialResultList<Todo>();
        searchResult.count = total;
        searchResult.skipped = argument.skip;
        searchResult.results = selectResult.map(this.ArrayToTodo);
        return searchResult;
    }

    public async create(todo: Todo): Promise<number> {
        let query: QueryConfig = {
            name: QueryNames.TodoTable_Create,
            text: "INSERT INTO todo (description, isDone) VALUES ($1, $2) RETURNING id",
            values: [todo.description, todo.isDone ? 1 : 0]
        };
        let result = await DbClient.Instance().query(query);
        return result[0]['id'];
    }

    public async remove(id: number): Promise<boolean> {
        let query: QueryConfig = {
            name: QueryNames.TodoTable_Remove,
            text: "DELETE FROM todo WHERE id = $1",
            values: [id]
        };

        await DbClient.Instance().query(query);

        return true;
    }

    public async read(id: number): Promise<Todo> {
        let query: QueryConfig = {
            name: QueryNames.TodoTable_Read,
            text: "SELECT * FROM todo WHERE id = $1",
            values: [id]
        };

        let result = await DbClient.Instance().query(query);
        let rec = this.ArrayToTodo(result[0]);
        return rec;
    }

    public async update(todo: Todo): Promise<boolean> {
        let query: QueryConfig = {
            name: QueryNames.TodoTable_Update,
            text: "UPDATE todo SET description = $1, isDone = $2 WHERE id = $3",
            values: [todo.description, todo.isDone ? 1 : 0, todo.id]
        };

        try
        {
            await DbClient.Instance().query(query);
        }
        catch(err){
            console.error(err);
        }
        return true;
    }

    private ArrayToTodo(row:any):Todo{
        let rec = new Todo();
        rec.id = row['id'];
        rec.description = row['description'];
        rec.isDone = row['isDone'];
        return rec;
    }
}
