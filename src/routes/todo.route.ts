import { Request, Response } from "express";
import { UserTableController } from "../DataStore/UserTableController";
import { SearchArgument, SortDirection } from "../DTOs/SearchArgument";
import { Utils } from "../utils";
import { User } from "../DTOs/User";
import { TodoTableController } from "../DataStore/TodoTableController";
import { Todo } from "../DTOs/Todo";

export async function search(req: Request, resp: Response) {
    let databaseSource = new TodoTableController();
    let argument = new SearchArgument();

    if (req.query.query) {
        argument.query = req.query.query;
    }
    if (req.query.skip && Utils.isPositiveInteger(req.query.skip)) {
        argument.skip = Number(req.query.skip);
    }
    if (req.query.take && Utils.isPositiveInteger(req.query.take)) {
        argument.take = Number(req.query.take);
    }

    let results = await databaseSource.search(argument);
    resp.json(results);
}

export async function read(req: Request, resp: Response) {
    let id = req.params.id;
    if (Utils.isPositiveInteger(id)) {
        let databaseSource = new UserTableController();
        let result = await databaseSource.read(id);
        resp.json(result);
    } else {
        resp.sendStatus(500);
    }
}

export async function create(req: Request, resp: Response) {
    var data = req.body;
    let todo = new Todo();

    if (data.description) {
        todo.description = data.description;
    }

    if (data.isDone) {
        todo.isDone = data.isDone;
    }

    if (data.id) {
        todo.id = data.id;
    }

    console.log(data);
    let databaseSource = new TodoTableController();
    if (data.id) {
        await databaseSource.update(todo);
        resp.sendStatus(202);
    } else {
        let id = await databaseSource.create(todo);
        resp.json(id);
    }
}