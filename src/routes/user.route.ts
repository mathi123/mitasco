import { Application, Request, Response } from "express";
import { UserTableController } from "../DataStore/UserTableController";
import { SearchArgument, SortDirection } from "../DTOs/SearchArgument";
import { Utils } from "../utils";
import { User } from "../DTOs/User";

export function configureRoute(app: Application) {
    app.get('/user', search);
    app.get('/user/:id', read);
    app.post('/user', create);
    app.put('/user', create);
}

let databaseSource = new UserTableController();
databaseSource.connect(dataBaseErrorHandler);

function search(req: Request, resp: Response) {
    let argument = new SearchArgument();

    if (req.query.query) {
        argument.query = req.query.query;
    }
    if (req.query.skip && Utils.isPositiveInteger(req.query.skip)) {
        argument.skip = Number(req.query.skip);
    }
    if (req.query.take && Utils.isPositiveInteger(req.query.take)) {
        argument.take = Number(req.query.take);
    }
    if (req.query.sortDirection && Utils.isPositiveInteger(req.query.sortDirection)) {
        let sortD = Number(req.query.sortDirection);
        argument.sortDirection = Math.min(sortD, SortDirection.Descending);
    }
    if (req.query.sortColumn && Utils.arrayContains(databaseSource.sortColumnOptions, req.query.sortColumn)) {
        argument.sortColumn = req.query.sortColumn;
    }
    else {
        argument.sortColumn = databaseSource.defaultSortColumn;
    }


    let res = databaseSource.search(argument, (users) => {
        resp.json(users);
    }, () => resp.send(500));


}

function read(req: Request, resp: Response) {
    let id = req.params.id;
    if (Utils.isPositiveInteger(id)) {
        databaseSource.read(id, (user) => resp.json(user), () => resp.sendStatus(500));
    } else {
        resp.sendStatus(500);
    }
}

function create(req: Request, resp: Response) {
    var data = req.body;
    let user = new User();

    if (data.fullname) {
        user.fullname = data.fullname;
    }

    if (data.email) {
        user.email = data.email;
    }

    if (data.id) {
        user.id = data.id;
    }

    console.log(data);

    if (data.id) {
        databaseSource.update(user, () => resp.sendStatus(202), () => resp.sendStatus(500));
    } else {
        databaseSource.create(user, (id) => resp.json(id), () => resp.sendStatus(500));
    }
}

function dataBaseErrorHandler(err: Error): void {
    console.log("error in handling database request");
    console.log(err);
}
