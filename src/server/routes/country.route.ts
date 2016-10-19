import { Response } from "express-serve-static-core";
import { Logger } from "../logger";
import { WebRequest } from "../web/web-request";
import { CountryController } from "../controllers/country.controller";

export async function getAll(req: WebRequest, resp: Response) {
    let priority = false;

    if (req.query.priority)
        priority = req.query.priority === '1';

    let databaseSource = new CountryController();

    try {
        let results = await databaseSource.getAll(priority);
        resp.json(results);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(500);
    }
}