import { Application, Request, Response } from 'express';
import { CustomerTableController } from '../DataStore/CustomerTableController';
import { SearchArgument } from '../DTOs/SearchArgument';

export function configureRoute(app: Application) {
    app.get('/company/:query', route);
}

function route(req: Request, resp: Response) {
    var query = req.params.query;
    let customerQueryer = new CustomerTableController();
    let argument = new SearchArgument();
    argument.query = query;

    customerQueryer.connect((err: Error) => {
        let res = customerQueryer.search(argument, (companies) => {
            var data = "";
            companies.forEach(company => {
                data = data + "\n" + company.toString();
                //resp.write(company.toString());
                console.log(company.toString());
            });

            console.log("klaar");
            customerQueryer.close();

            resp.send(data);
        }, dataBaseErrorHandler);
    });
}

function dataBaseErrorHandler(err: Error): void {
    console.log("error in handling database request");
    console.log(err);
}