import { Application, Request, Response } from "express";
import { UserTableController } from "../DataStore/UserTableController";
import { SearchArgument, SortDirection } from "../DTOs/SearchArgument";
import { Utils } from "../utils";


export function configureRoute(app: Application) {
    app.get('/user', search);
    app.post('/user');
}

function search(req: Request, resp: Response) {
    let databaseSource = new UserTableController();
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

    databaseSource.connect((err: Error) => {
        let res = databaseSource.search(argument, (users) => {
            var data = `resultaten:  <b>${ users.count }</b><ul> `;
            users.results.forEach(user => {
                data += `<li>${user.toString()}</li>`;
            });
            data += '</ul>';
            databaseSource.close();

            resp.send(data);
        }, dataBaseErrorHandler);
    });
}

function dataBaseErrorHandler(err: Error): void {
    console.log("error in handling database request");
    console.log(err);
}
