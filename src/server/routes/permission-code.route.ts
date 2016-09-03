import { Request,Response } from "express-serve-static-core";
import { PermissionCodeController } from "../controllers/permission-code.controller";
import { Logger } from "../logger";
import { PermissionCode } from "../shared/permission-code";
import { DeserializeUtil } from "../shared/deserialize-util";

export async function getAll(req: Request, resp: Response) {
    let databaseSource = new PermissionCodeController();

    try {
        let results = await databaseSource.getAll();
        resp.json(results);
    }catch (error){
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function create(req: Request, resp: Response) {
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

export async function read(req: Request, resp: Response) {
    let databaseSource = new PermissionCodeController();

    try {
        let id = DeserializeUtil.StrictNumber(req.params.id);

        let results = await databaseSource.read(id);
        resp.json(results);
    }catch (error){
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}

export async function update(req: Request, resp: Response) {
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

export async function remove(req: Request, resp: Response) {
    let databaseSource = new PermissionCodeController();

    try {
        let id = DeserializeUtil.StrictNumber(req.params.id);

        let results = await databaseSource.remove(id);
        resp.json(results);
    }catch (error){
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}