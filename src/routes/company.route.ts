import { Application, Request, Response } from 'express';
import { CustomerTableController } from '../DataStore/CustomerTableController';
import { SearchArgument } from '../DTOs/SearchArgument';

export function configureRoute(app : Application)
{
    app.get('/company', route);
}

function route(req : Request, resp : Response)
{
    let customerQueryer = new CustomerTableController();
    let argument = new SearchArgument();
        
    customerQueryer.connect((err : Error) => {
        console.log('verbinding gemaakt gelukt');
        
        argument.query = "Mat";
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

function dataBaseErrorHandler(err : Error) : void {
    console.log("error in handling database request");
    console.log(err);
}