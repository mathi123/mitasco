import { GroupController } from "../controllers/group.controller";
import { Response } from "express-serve-static-core";
import { Logger } from "../logger";
import { Group } from "../shared/group";
import { Utils } from "../utils";
import { WebRequest } from "../web/web-request";
import { Permissions } from "../security/permissions";

export async function getAll(req: WebRequest, resp: Response) {
    if (req.permissions.indexOf(Permissions.Admin) < 0) {
        resp.sendStatus(550);
        return;
    }

    let databaseSource = new GroupController();

    try {
        let results = await databaseSource.getAll();
        resp.json(results);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function create(req: WebRequest, resp: Response) {
    if (req.permissions.indexOf(Permissions.Admin) < 0) {
        resp.sendStatus(550);
        return;
    }

    let databaseSource = new GroupController();

    try {
        let dto = new Group();
        dto.deserialize(req.body);

        let results = await databaseSource.create(dto);
        resp.json(results);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function read(req: WebRequest, resp: Response) {
    if (req.permissions.indexOf(Permissions.Admin) < 0) {
        resp.sendStatus(550);
        return;
    }

    let databaseSource = new GroupController();

    let id = req.params.id;

    if (Utils.isPositiveInteger(id)) {

        try {
            let results = await databaseSource.read(id);
            resp.json(results);
        } catch (error) {
            Logger.routeException(req, error);
            resp.sendStatus(500);
        }
    } else {
        Logger.logRequest(req);
        resp.sendStatus(500);
    }
}

export async function update(req: WebRequest, resp: Response) {
    if (req.permissions.indexOf(Permissions.Admin) < 0) {
        resp.sendStatus(550);
        return;
    }

    let databaseSource = new GroupController();

    try {
        let dto = new Group();
        dto.deserialize(req.body);

        let results = await databaseSource.update(dto);
        resp.json(results);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function remove(req: WebRequest, resp: Response) {
    if (req.permissions.indexOf(Permissions.Admin) < 0) {
        resp.sendStatus(550);
        return;
    }

    let databaseSource = new GroupController();
    let id = req.params.id;

    if (Utils.isPositiveInteger(id)) {
        try {
            let results = await databaseSource.remove(id);
            resp.json(results);
        } catch (error) {
            Logger.routeException(req, error);
            resp.sendStatus(500);
        }
    } else {
        Logger.logRequest(req);
        resp.sendStatus(500);
    }
}