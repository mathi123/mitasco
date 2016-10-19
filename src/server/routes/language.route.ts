import { Response } from "express-serve-static-core";
import { Logger } from "../logger";
import { WebRequest } from "../web/web-request";
import { LanguageController } from "../controllers/language.controller";

export async function getAll(req: WebRequest, resp: Response) {
    let databaseSource = new LanguageController();

    try {
        let results = await databaseSource.getAll();
        resp.json(results);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}