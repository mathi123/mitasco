import { Response } from "express";
import { UserController } from "../controllers/user.controller";
import { SearchArgument } from "../shared/search-argument";
import { Utils } from "../utils";
import { TodoController } from "../controllers/todo.controller";
import { Todo } from "../shared/todo";
import { Logger } from "../logger";
import { WebRequest } from "../web/web-request";

export async function search(req: WebRequest, resp: Response) {
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
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function read(req: WebRequest, resp: Response) {
    let id = req.params.id;
    if (Utils.isPositiveInteger(id)) {
        let databaseSource = new UserController();
        try {

            let result = await databaseSource.read(id);
            resp.json(result);
        } catch (error) {
            Logger.routeException(req, error);
            resp.sendStatus(500);
        }
    } else {
        resp.sendStatus(500);
    }
}

export async function create(req: WebRequest, resp: Response) {
    let data = req.body;
    let todo = new Todo();

    try {
        todo.deserialize(data);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(400);
    }

    let databaseSource = new TodoController();
    try {
        if (data.id) {
            let result = await databaseSource.update(todo);
            resp.json(result);
        } else {
            let id = await databaseSource.create(todo);
            resp.json(id);
        }
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function remove(req: WebRequest, resp: Response) {
    let id = req.params.id;
    if (Utils.isPositiveInteger(id)) {
        let databaseSource = new TodoController();

        try {
            let result = await databaseSource.remove(id);
            resp.json(result);
        } catch (error) {
            Logger.routeException(req, error);
            resp.sendStatus(500);
        }
    } else {
        resp.sendStatus(400);
    }
}