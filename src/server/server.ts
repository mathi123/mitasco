import * as express from "express";
import * as http from "http";
import * as bodyParser from "body-parser";
import * as userRoutes from "./routes/user.route";
import * as indexRoutes from "./routes/index.route";
import * as todoRoutes from "./routes/todo.route";

class StartUp {
    public static main(): number {
        var app = express();

        app.set('port', process.env.PORT || 3000);
        app.use(bodyParser.json());

        // Configure routes
        app.get('/', indexRoutes.route);

        app.get('/api/user', userRoutes.search);
        app.get('/api/user/:id', userRoutes.read);
        app.post('/api/user', userRoutes.create);
        app.put('/api/user', userRoutes.create);

        app.get('/api/todo', todoRoutes.search);
        app.get('/api/todo/:id', todoRoutes.read);
        app.post('/api/todo', todoRoutes.create);
        //app.put('/api/todo', todoRoutes.create);
        app.delete('/api/todo/:id', todoRoutes.remove);

        app.use('/app', express.static(__dirname + '/app'));

        http.createServer(app).listen(app.get('port'), function () {
            console.log("Express server listening on port " + app.get('port'));
        });

        return 0;
    }
}

StartUp.main();