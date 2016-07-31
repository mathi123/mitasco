import { Request, Response } from "express";
import { CustomerTableController } from "../database/CustomerTableController";
import { SearchArgument } from "../shared/SearchArgument";

export async function search(req: Request, resp: Response) {
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