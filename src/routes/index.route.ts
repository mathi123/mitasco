import { Application, Request, Response } from 'express';

export function configureRoute(app: Application) {
    app.get('/', route);
}

function route(req: Request, res: Response) {
    res.send('Hello world');
};
