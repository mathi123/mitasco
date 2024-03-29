import { WebServer } from "./web/web-server";
import { RouteType } from "./web/route-type";
import * as userRoutes from "./routes/user.route";
import * as todoRoutes from "./routes/todo.route";
import * as permissionCodeRoutes from "./routes/permission-code.route";
import * as authenticationRoutes from "./routes/authentication.route";
import * as groupRoutes from "./routes/group.route";
import * as countryRoutes from "./routes/country.route";
import * as languageRoutes from "./routes/language.route";
import * as companyRoutes from "./routes/company.route";

class StartUp {
    public static main(): number {
        let server = new WebServer();
        server.init(3000);

        // token
        server.configureRoute(RouteType.POST, 'token', authenticationRoutes.getToken, '', false);

        // user routes
        server.configureRoute(RouteType.GET, 'user', userRoutes.search);
        server.configureRoute(RouteType.GET, 'user', userRoutes.read, ':id');
        server.configureRoute(RouteType.PUT, 'user', userRoutes.create);
        server.configureRoute(RouteType.POST, 'user', userRoutes.register, '', false);

        // todo routes
        server.configureRoute(RouteType.GET, 'todo', todoRoutes.search, '');
        server.configureRoute(RouteType.GET, 'todo', todoRoutes.read, ':id');
        server.configureRoute(RouteType.PUT, 'todo', todoRoutes.create, '');
        server.configureRoute(RouteType.POST, 'todo', todoRoutes.create, '');
        server.configureRoute(RouteType.DELETE, 'todo', todoRoutes.remove, ':id');

        // permissionCode routes
        server.configureRoute(RouteType.GET, 'permissioncode', permissionCodeRoutes.getAll);
        server.configureRoute(RouteType.GET, 'permissioncode', permissionCodeRoutes.read, ':id');
        server.configureRoute(RouteType.PUT, 'permissioncode', permissionCodeRoutes.update);
        server.configureRoute(RouteType.POST, 'permissioncode', permissionCodeRoutes.create);
        server.configureRoute(RouteType.DELETE, 'permissioncode', permissionCodeRoutes.remove, ':id');

        // group routes
        server.configureRoute(RouteType.GET, 'group', groupRoutes.getAll);
        server.configureRoute(RouteType.GET, 'group', groupRoutes.read, ':id');
        server.configureRoute(RouteType.PUT, 'group', groupRoutes.update);
        server.configureRoute(RouteType.POST, 'group', groupRoutes.create);
        server.configureRoute(RouteType.DELETE, 'group', groupRoutes.remove, ':id');

        // country routes
        server.configureRoute(RouteType.GET, 'country', countryRoutes.getAll);

        // language routes
        server.configureRoute(RouteType.GET, 'language', languageRoutes.getAll);

        // company routes
        server.configureRoute(RouteType.GET, 'company', companyRoutes.search, '');
        server.configureRoute(RouteType.GET, 'company', companyRoutes.read, ':id');
        server.configureRoute(RouteType.PUT, 'company', companyRoutes.createOrUpdate, '');
        server.configureRoute(RouteType.POST, 'company', companyRoutes.createOrUpdate, '');
        server.configureRoute(RouteType.DELETE, 'company', companyRoutes.remove, ':id');

        server.start();

        return 0;
    }
}

StartUp.main();