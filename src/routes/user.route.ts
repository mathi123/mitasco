import { Response } from "express";
import { UserController } from "../controllers/user.controller";
import { SearchArgument } from "../shared/search-argument";
import { SortDirection } from "../shared/sort-direction";
import { Utils } from "../utils";
import { User } from "../shared/user";
import { WebRequest } from "../web/web-request";
import { PermissionCodes } from "../shared/permissions-codes";
import { RegistrationData } from "../shared/registration-data";
import { Logger } from "../logger";

export async function search(req: WebRequest, resp: Response) {
    if (req.permissions.indexOf(PermissionCodes.Admin) < 0) {
        resp.sendStatus(550);
        return;
    }

    let databaseSource = new UserController();
    let argument = new SearchArgument();

    if (req.query.query) {
        argument.query = req.query.query;
    } else {
        argument.query = '';
    }

    if (req.query.skip && Utils.isPositiveInteger(req.query.skip)) {
        argument.skip = Number(req.query.skip);
    } else {
        argument.skip = 0;
    }
    if (req.query.take && Utils.isPositiveInteger(req.query.take)) {
        argument.take = Number(req.query.take);
    } else {
        argument.take = 15;
    }
    if (req.query.sortDirection && Utils.isPositiveInteger(req.query.sortDirection)) {
        let sortD = Number(req.query.sortDirection);
        argument.sortDirection = Math.min(sortD, SortDirection.Descending);
    } else {
        argument.sortDirection = SortDirection.Acscending;
    }
    if (req.query.sortColumn && Utils.arrayContains(databaseSource.sortColumnOptions, req.query.sortColumn)) {
        argument.sortColumn = req.query.sortColumn;
    } else {
        argument.sortColumn = databaseSource.defaultSortColumn;
    }

    let users = await databaseSource.search(argument);

    resp.json(users);
}

export async function read(req: WebRequest, resp: Response) {
    if (req.permissions.indexOf(PermissionCodes.Admin) < 0) {
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
    if (req.permissions.indexOf(PermissionCodes.Admin) < 0) {
        resp.sendStatus(550);
        return;
    }
    let user = new User();
    try {
        user.deserialize(req.body);

        let databaseSource = new UserController();
        await databaseSource.update(user);
        resp.sendStatus(202);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function register(req: WebRequest, resp: Response) {
    let data = new RegistrationData();

    try {
        data.deserialize(req.body);

        let controller = new UserController();
        let user = new User();
        user.fullname = data.fullName;
        user.email = data.email;

        var id = await controller.create(user, data.password);
        resp.json(id);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}