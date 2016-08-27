import * as express from "express";
import * as bodyParser from "body-parser";
import * as https from "https";
import * as fs from "fs";
import { RouteType } from "./route-type"
import { Request,Response } from "express";


export class WebServer{
    private _app:any;
    private _port:number;
    private _routePrefix="api";
    private _apiVersion="v1.0";
    private _oauth:any;

    constructor(){
        this._app = express();
    }
    
    public init(port:number){
        this._port = port;
        this._app.set('port', port);
        this._app.use(bodyParser.json());
    }

    public start(){
        let pkey = fs.readFileSync('key.pem');
        let pcert = fs.readFileSync('cert.pem')

        let options = {
            key: pkey,
            cert: pcert
        };

        this._app.use('/app', express.static(__dirname + '/app'));
        console.log(`setting up server on port ${this._port}`);
        https.createServer(options, this._app).listen(this._port, () => console.log("server up and running"));
    }
    
    public configureRoute(type:RouteType, entity:string,
                          controller:(req: Request, resp: Response) => void,
                          suffix:string = ''){

        let route = this.buildRoute(entity, suffix);

        switch(type){
            case RouteType.GET:
                this._app.get(route, controller);
                console.info(`route GET ${route} is up`);
                break;
            case RouteType.POST:
                this._app.post(route, controller);
                console.info(`route POST ${route} is up`);
                break;
            case RouteType.PUT:
                this._app.put(route, controller);
                console.info(`route PUT ${route} is up`);
                break;
            case RouteType.DELETE:
                this._app.delete(route, controller);
                console.info(`route DELETE ${route} is up`);
                break;
            default: throw new Error();
        }
    }

    private buildRoute(entity:string = '', suffix:string = ''):string{
        suffix = this.trimDashes(suffix);
        entity = this.trimDashes(entity);

        let route = `/${this._routePrefix}`;

        if(entity != ''){
            route = `${route}/${entity}`;
        }

        if(suffix != ''){
            route = `${route}/${suffix}`;
        }

        return route;
    }

    private trimDashes(path:string):string{
        while(path.startsWith('/')){
            path = path.substr(1);
        }
        while(path.endsWith('/')){
            path = path.substr(0,path.length);
        }
        return path.trim();
    }
}