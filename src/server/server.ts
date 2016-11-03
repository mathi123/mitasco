import { WebServer } from "./web/web-server";
import { RouteType } from "./web/route-type";
import * as userRoutes from "./routes/user.route";
import * as todoRoutes from "./routes/todo.route";
import * as permissionCodeRoutes from "./routes/permission-code.route";
import * as authenticationRoutes from "./routes/authentication.route";
import * as groupRoutes from "./routes/group.route";
import * as countryRoutes from "./routes/country.route";
import * as languageRoutes from "./routes/language.route";

class StartUp {
    public static main(): number {
        let input = StartUp.getArgument("p");
        let port = input != '' ? Number(input) : 3000;

        let server = new WebServer();
        server.init(port);

        // token
        server.configureRoute(RouteType.POST, 'token', authenticationRoutes.getToken, '', false);

        // user routes
        server.configureRoute(RouteType.GET, 'user', userRoutes.search);
        server.configureRoute(RouteType.GET, 'user', userRoutes.read, ':id');
        server.configureRoute(RouteType.POST, 'user', userRoutes.create);
        server.configureRoute(RouteType.PUT, 'user', userRoutes.register, '', false);

        // todo routes
        server.configureRoute(RouteType.GET, 'todo', todoRoutes.search, '');
        server.configureRoute(RouteType.GET, 'todo', todoRoutes.read, ':id');
        server.configureRoute(RouteType.POST, 'todo', todoRoutes.create, '');
        server.configureRoute(RouteType.PUT, 'todo', todoRoutes.create, '');
        server.configureRoute(RouteType.DELETE, 'todo', todoRoutes.remove, ':id');

        // permissionCode routes
        server.configureRoute(RouteType.GET, 'permissioncode', permissionCodeRoutes.getAll);
        server.configureRoute(RouteType.GET, 'permissioncode', permissionCodeRoutes.read, ':id');
        server.configureRoute(RouteType.POST, 'permissioncode', permissionCodeRoutes.update);
        server.configureRoute(RouteType.PUT, 'permissioncode', permissionCodeRoutes.create);
        server.configureRoute(RouteType.DELETE, 'permissioncode', permissionCodeRoutes.remove, ':id');

        // group routes
        server.configureRoute(RouteType.GET, 'group', groupRoutes.getAll);
        server.configureRoute(RouteType.GET, 'group', groupRoutes.read, ':id');
        server.configureRoute(RouteType.POST, 'group', groupRoutes.update);
        server.configureRoute(RouteType.PUT, 'group', groupRoutes.create);
        server.configureRoute(RouteType.DELETE, 'group', groupRoutes.remove, ':id');

        // country routes
        server.configureRoute(RouteType.GET, 'country', countryRoutes.getAll);

        // language routes
        server.configureRoute(RouteType.GET, 'language', languageRoutes.getAll);

        server.start();

        return 0;
    }

    public static getArgument(identifier: string): string {
        let id = `-${identifier}`;
        let index = process.argv.indexOf(id);

        if (index >= 0 && process.argv.length > index + 1) {
            return process.argv[index + 1];
        } else {
            return '';
        }
    }
}

StartUp.main();