import { Response } from "express";
import { UserController } from "../controllers/user.controller";
import { SearchArgument } from "../shared/search-argument";
import { SortDirection } from "../shared/sort-direction";
import { Utils } from "../utils";
import { User } from "../shared/user";
import { WebRequest } from "../web/web-request";
import { Permissions } from "../security/permissions";

export async function search(req: WebRequest, resp: Response) {
    if(req.permissions.indexOf(Permissions.Admin) < 0){
        resp.sendStatus(550);
        return;
    }

    let databaseSource = new UserController();
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
    if (req.query.sortDirection && Utils.isPositiveInteger(req.query.sortDirection)) {
        let sortD = Number(req.query.sortDirection);
        argument.sortDirection = Math.min(sortD, SortDirection.Descending);
    }
    if (req.query.sortColumn && Utils.arrayContains(databaseSource.sortColumnOptions, req.query.sortColumn)) {
        argument.sortColumn = req.query.sortColumn;
    }
    else {
        argument.sortColumn = databaseSource.defaultSortColumn;
    }

    let users = await databaseSource.search(argument);

    resp.json(users);
}

export async function read(req: WebRequest, resp: Response) {
    if(req.permissions.indexOf(Permissions.Admin) < 0){
        resp.sendStatus(550);
        return;
    }

    let id = req.params.id;
    if (Utils.isPositiveInteger(id)) {
        let databaseSource = new UserController();
        let user = await databaseSource.read(id);
        resp.json(user);
    } else {
        resp.sendStatus(500);
    }
}

export async function create(req: WebRequest, resp: Response) {
    if(req.permissions.indexOf(Permissions.Admin) < 0){
        resp.sendStatus(550);
        return;
    }

    var data = req.body;
    let user = new User();

    if (data.fullname) {
        user.fullname = data.fullname;
    }

    if (data.email) {
        user.email = data.email;
    }

    if (data.id) {
        user.id = data.id;
    }

    let databaseSource = new UserController();
    if (data.id) {
        await databaseSource.update(user);
        resp.sendStatus(202);
    } else {
        let id = await databaseSource.create(user, 'test');
        resp.json(id);
    }
}