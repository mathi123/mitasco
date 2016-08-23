import { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { SearchArgument } from "../shared/search-argument";
import { Utils } from "../utils";
import { TodoController } from "../controllers/todo.controller";
import { Todo } from "../shared/todo";

export async function search(req: Request, resp: Response) {
    let databaseSource = new TodoController();
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

    try {
        let results = await databaseSource.search(argument);
        resp.json(results);
    }catch (error){
        resp.sendStatus(500);
    }
}

export async function read(req: Request, resp: Response) {
    let id = req.params.id;
    if (Utils.isPositiveInteger(id)) {
        let databaseSource = new UserController();
        let result = await databaseSource.read(id);
        resp.json(result);
    } else {
        resp.sendStatus(500);
    }
}

export async function create(req: Request, resp: Response) {
    let data = req.body;
    let todo = new Todo();

    todo.deserialize(data);

    console.log(data);
    let databaseSource = new TodoController();
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
        let databaseSource = new TodoController();
        let result = await databaseSource.remove(id);
        resp.json(result);
    } else {
        resp.json(false);
    }
}