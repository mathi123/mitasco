import { WebServer } from "./web-server";
import { RouteType } from "./route-type";
import * as userRoutes from "./routes/user.route";
import * as todoRoutes from "./routes/todo.route";

class StartUp{
    public static main(): number {
        let server = new WebServer();
        server.init(3000);

        // user routes
        server.configureRoute(RouteType.GET, 'user', userRoutes.search);
        server.configureRoute(RouteType.GET, 'user', userRoutes.read, ':id');
        server.configureRoute(RouteType.POST, 'user', userRoutes.create);
        server.configureRoute(RouteType.PUT, 'user', userRoutes.create); // TODO: create -> update

        // todo routes
        server.configureRoute(RouteType.GET, 'todo', todoRoutes.search);
        server.configureRoute(RouteType.GET, 'todo', todoRoutes.read, ':id');
        server.configureRoute(RouteType.POST, 'todo', todoRoutes.create);
        server.configureRoute(RouteType.PUT, 'todo', todoRoutes.create); // TODO: create -> update
        server.configureRoute(RouteType.DELETE, 'todo', todoRoutes.remove, ':id');

        server.start();

        return 0;
    }
}

StartUp.main();