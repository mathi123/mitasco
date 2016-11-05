import { Request, Response } from "express";
import { Credentials } from "../shared/credentials";
import { AuthenticationController } from "../controllers/authentication.controller";
import { Logger } from "../logger";

export async function getToken(req: Request, res: Response) {
    let data = req.body;
    let credentials = new Credentials();
    let controller = new AuthenticationController();

    try {
        credentials.deserialize(data);
        let isValid = await controller.credentialsAreValid(credentials);

        if (isValid) {
            let result = await controller.createLoginResult(credentials.email);
            res.json(result);
        } else {
            Logger.log("invalid credentials!!");
            res.sendStatus(401);
        }
    } catch (error) {
        Logger.routeException(req, error);
        res.sendStatus(401);
    }
}
