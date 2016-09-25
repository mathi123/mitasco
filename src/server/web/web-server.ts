import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import { RouteType } from "./route-type";
import { AuthenticationController } from "../controllers/authentication.controller";
import { Logger } from "../logger";
import { TokenPayload } from "../security/token-payload";
import { Utils } from "../utils";
import { WebRequest } from "./web-request";


export class WebServer {
    private _app: any;
    private _port: number;
    private _routePrefix = "api";

    constructor() {
        this._app = express();
    }

    public init(port: number) {
        this._port = port;
        this._app.set('port', port);
        this._app.use(bodyParser.json());
    }

    public start() {
        let pkey = fs.readFileSync('server.key');
        let pcert = fs.readFileSync('server.crt');

        let options = {
            key: pkey,
            cert: pcert
        };

        this._app.use('/app', express.static(__dirname + '/../app'));
        this._app.all('/app/*', (req: Request, res: Response)=> {
            res.sendFile(path.resolve(__dirname + '/../app/index.html'));
        });

        Logger.log(`setting up server on port ${this._port}`);
        https.createServer(options, this._app).listen(this._port, () => Logger.log("server up and running"));
    }

    public configureRoute(type: RouteType, entity: string,
                          controller: (req: Request, resp: Response) => void,
                          suffix: string = '', authenticationRequired: boolean = true) {

        let route = this.buildRoute(entity, suffix);

        if (authenticationRequired) {
            this.registerRouteSecurity(type, route);
        }

        this.registerRoute(type, route, controller);

        Logger.log(`route ${Utils.routeToString(type, route)} is up`);
    }

    private async tokenChecker(req: Request, res: Response, next) {
        let token = req.get("token");
        let auth = new AuthenticationController();

        try {
            let data: TokenPayload = await auth.verifyToken(token);
            (req as WebRequest).token = data;
            (req as WebRequest).permissions = data.per;

            next();
        } catch (err) {
            Logger.log("token missing or invalid");
            Logger.log(`token: ${token}`);
            Logger.routeException(req, err);
            res.sendStatus(401);
        }
    }

    private registerRouteSecurity(type: RouteType, route: string) {
        switch (type) {
            case RouteType.GET:
                this._app.get(route, this.tokenChecker);
                break;
            case RouteType.POST:
                this._app.post(route, this.tokenChecker);
                break;
            case RouteType.PUT:
                this._app.put(route, this.tokenChecker);
                break;
            case RouteType.DELETE:
                this._app.delete(route, this.tokenChecker);
                break;
            default:
                throw new Error();
        }
    }

    private registerRoute(type: RouteType, route: string, controller: (req: Request, resp: Response) => void) {
        switch (type) {
            case RouteType.GET:
                this._app.get(route, controller);
                break;
            case RouteType.POST:
                this._app.post(route, controller);
                break;
            case RouteType.PUT:
                this._app.put(route, controller);
                break;
            case RouteType.DELETE:
                this._app.delete(route, controller);
                break;
            default:
                throw new Error();
        }
    }

    private buildRoute(entity: string = '', suffix: string = ''): string {
        suffix = this.trimDashes(suffix);
        entity = this.trimDashes(entity);

        let route = `/${this._routePrefix}`;

        if (entity != '') {
            route = `${route}/${entity}`;
        }

        if (suffix != '') {
            route = `${route}/${suffix}`;
        }

        return route;
    }

    private trimDashes(path: string): string {
        while (path.startsWith('/')) {
            path = path.substr(1);
        }
        while (path.endsWith('/')) {
            path = path.substr(0, path.length);
        }
        return path.trim();
    }
}