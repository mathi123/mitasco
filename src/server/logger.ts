
import { Request } from "express-serve-static-core";

export class Logger{
    public static routeException(req:Request, err:Error, message:string= ''){
        // Todo: load log configuration from config file
        console.error(`error in route ${req.method} ${req.url}`);
        console.error(err);
        console.error("inputs:"+JSON.stringify(req.params));
        console.error(JSON.stringify(req.body));
    }
}