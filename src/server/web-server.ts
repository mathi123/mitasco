import * as express from "express";
import * as bodyParser from "body-parser";
import * as http from "http";
import { RouteType } from "./route-type"
import { Request,Response } from "express";
var oauth2 = require('node-oauth2-server');


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
        this.configureSecurityRoutes();
    }

    public configureSecurityRoutes(){
        let config={
            model: require('./security/oauth2'),
            grants: ['auth_code', 'password'],
            debug: true
        };

        this._oauth = oauth2(config);
        this._app.oauth = this._oauth;

        // Token service
        this._app.all('/oauth/token', this._oauth.grant());

        // Show them the "do you authorise xyz app to access your content?" page
        this._app.get('/oauth/authorise', (req:Request, res:Response) => {
            if (!req.app.locals.user) {
                // If they aren't logged in, send them to your own login implementation
                return res.redirect('/login?redirect=' + req.path + '&client_id=' +
                    req.query.client_id + '&redirect_uri=' + req.query.redirect_uri);
            }

            res.render('authorise', {
                client_id: req.query.client_id,
                redirect_uri: req.query.redirect_uri
            });
        });

        // Handle authorise
        this._app.post('/oauth/authorise', (req:Request, res:Response, next) => {
            if (!req.app.locals.user) {
                return res.redirect('/login?client_id=' + req.query.client_id +
                    '&redirect_uri=' + req.query.redirect_uri);
            }

            next();
        }, this._oauth.authCodeGrant((req:Request, next) => {
            // The first param should to indicate an error
            // The second param should a bool to indicate if the user did authorise the app
            // The third param should for the user/uid (only used for passing to saveAuthCode)
            next(null, req.body.allow === 'yes', req.app.locals.user.id, req.app.locals.user);
        }));

        // Show login
        this._app.get('/login', (req:Request, res:Response, next) => {
            res.render('login', {
                redirect: req.query.redirect,
                client_id: req.query.client_id,
                redirect_uri: req.query.redirect_uri
            });
        });

        // Handle login
        this._app.post('/login', (req:Request, res:Response, next) => {
            // Insert your own login mechanism
            if (req.body.email !== 'thom@nightworld.com') {
                res.render('login', {
                    redirect: req.body.redirect,
                    client_id: req.body.client_id,
                    redirect_uri: req.body.redirect_uri
                });
            } else {
                // Successful logins should send the user back to the /oauth/authorise
                // with the client_id and redirect_uri (you could store these in the session)
                return res.redirect((req.body.redirect || '/home') + '?client_id=' +
                    req.body.client_id + '&redirect_uri=' + req.body.redirect_uri);
            }
        });

        this._app.get('/secret', this._app.oauth.authorise(), (req:Request, res:Response) => {
            // Will require a valid access_token
            res.send('Secret area');
        });

        this._app.get('/public', (req:Request, res:Response) => {
            // Does not require an access_token
            res.send('Public area');
        });

        // Error handling
        this._app.use(this._app.oauth.errorHandler());
    }

    public start(){
        this._app.use('/app', express.static(__dirname + '/app'));
        console.log(`setting up server on port ${this._port}`);
        http.createServer(this._app).listen(this._port, () => console.log("server up and running"));
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