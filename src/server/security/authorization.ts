import { Request, Response } from "express-serve-static-core";

export class Authorization{
    public static isAuthorized(req:Request, res:Response, next){
        //if(req.session.authorized) next();

    }
}