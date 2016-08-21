import { Request, Response } from "express";
import { Credentials } from "../shared/credentials";


export function getToken(req: Request, res: Response) {
    let data = req.body;
    let credentials = new Credentials();

    try{
        credentials.deserialize(data);
        //todo login
        // ...

    }catch(error) {
        console.debug("invalid authentication request");
    }
}
