import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as userRoutes from "./routes/user.route";
import * as indexRoutes from "./routes/index.route";

class StartUp {
    public static main(): number {
        let app = new express;

        app.set('port', process.env.PORT || 3000);
        app.use(bodyParser.json());

        // Configure routes
        app.get('/', indexRoutes.route);
        app.get('/user', userRoutes.search);
        app.get('/user/:id', userRoutes.read);
        app.post('/user', userRoutes.create);
        app.put('/user', userRoutes.create);

        http.createServer(app).listen(app.get('port'), function () {
            console.log("Express server listening on port " + app.get('port'));
        });

        return 0;
    }
}

StartUp.main();