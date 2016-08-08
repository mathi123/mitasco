import { Request, Response } from "express";
import { UserTableController } from "../database/UserTableController";
import { SearchArgument, SortDirection } from "../shared/SearchArgument";
import { Utils } from "../utils";
import { User } from "../shared/User";
import { TodoTableController } from "../database/TodoTableController";
import { Todo } from "../shared/Todo";

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
    }else{
        todo.description = '';
    }

    if (data.isDone) {
        todo.isDone = data.isDone;
    }else{
        todo.isDone = false;
    }

    if (data.id) {
        todo.id = data.id;
    }else{
        todo.id = 0;
    }

    console.log(data);
    let databaseSource = new TodoTableController();
    if (data.id) {
        let result = await databaseSource.update(todo);
        resp.json(result);
    } else {
        let id = await databaseSource.create(todo);
        resp.json(id);
    }
}

export async function remove(req: Request, resp: Response){
    let id = req.params.id;
    if (Utils.isPositiveInteger(id)) {
        let databaseSource = new TodoTableController();
        let result = await databaseSource.remove(id);
        resp.json(result);
    } else {
        resp.json(false);
    }
}