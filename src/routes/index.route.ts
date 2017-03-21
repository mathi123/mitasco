import { Request, Response } from "express";

export function route(req: Request, res: Response) {
    res.send('Hello world');
}
