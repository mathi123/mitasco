import { Response } from "express-serve-static-core";
import { PermissionCodeController } from "../controllers/permission-code.controller";
import { Logger } from "../logger";
import { PermissionCode } from "../shared/permission-code";
import { Utils } from "../utils";
import { WebRequest } from "../web/web-request";

export async function getAll(req: WebRequest, resp: Response) {
    let databaseSource = new PermissionCodeController();

    try {
        let results = await databaseSource.getAll();
        resp.json(results);
    }catch (error){
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function create(req: WebRequest, resp: Response) {
    let databaseSource = new PermissionCodeController();

    try {
        let dto = new PermissionCode();
        dto.deserialize(req.body);

        let results = await databaseSource.create(dto);
        resp.json(results);
    }catch (error){
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function read(req: WebRequest, resp: Response) {
    let databaseSource = new PermissionCodeController();

    let id = req.params.id;

    if (Utils.isPositiveInteger(id)) {

        try {
            let results = await databaseSource.read(id);
            resp.json(results);
        } catch (error) {
            Logger.routeException(req, error);
            resp.sendStatus(500);
        }
    }else{
        Logger.logRequest(req);
        resp.sendStatus(500);
    }
}

export async function update(req: WebRequest, resp: Response) {
    let databaseSource = new PermissionCodeController();

    try {
        let dto = new PermissionCode();
        dto.deserialize(req.body);

        let results = await databaseSource.update(dto);
        resp.json(results);
    }catch (error){
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function remove(req: WebRequest, resp: Response) {
    let databaseSource = new PermissionCodeController();
    let id = req.params.id;

    if (Utils.isPositiveInteger(id)) {
        try {
            let results = await databaseSource.remove(id);
            resp.json(results);
        }catch (error){
            Logger.routeException(req, error);
            resp.sendStatus(500);
        }
    }else{
        Logger.logRequest(req);
        resp.sendStatus(500);
    }
}