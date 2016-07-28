import { Application, Request, Response } from "express";
import { CustomerTableController } from "../DataStore/CustomerTableController";
import { SearchArgument } from "../DTOs/SearchArgument";

export function configureRoute(app: Application) {
    app.get('/company/:query', route);
}

async function route(req: Request, resp: Response) {
    var query = req.params.query;
    let customerQueryer = new CustomerTableController();
    let argument = new SearchArgument();
    argument.query = query;

    let companies = await customerQueryer.search(argument);

    var data = "";
    companies.forEach(company => {
        data = data + "\n" + company.toString();
        //resp.write(company.toString());
        console.log(company.toString());
    });

    resp.send(data);
}

function dataBaseErrorHandler(err: Error): void {
    console.log("error in handling database request");
    console.log(err);
}
