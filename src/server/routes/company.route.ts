import { Response } from "express";
import { SearchArgument } from "../shared/search-argument";
import { Utils } from "../utils";
import { Logger } from "../logger";
import { WebRequest } from "../web/web-request";
import { CompanyController } from "../controllers/company.controller";
import { Company } from "../shared/company";

export async function search(req: WebRequest, resp: Response) {
    let databaseSource = new CompanyController();
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
        let databaseSource = new CompanyController();
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

export async function createOrUpdate(req: WebRequest, resp: Response) {
    let data = req.body;
    let company = new Company();

    try {
        company.deserialize(data);
    } catch (error) {
        Logger.routeException(req, error);
        resp.sendStatus(400);
        return;
    }

    let databaseSource = new CompanyController();
    try {
        if (data.id) {
            let result = await databaseSource.update(company);
            resp.json(result);
        } else {
            let id = await databaseSource.create(company);
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
        let databaseSource = new CompanyController();

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