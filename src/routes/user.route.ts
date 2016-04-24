import { Application, Request, Response } from 'express';
import { UserTableController } from '../DataStore/UserTableController';
import { SearchArgument } from '../DTOs/SearchArgument';

export function configureRoute(app : Application)
{
    app.get('/user/:query', route);
}

function route(req : Request, resp : Response)
{
    let databaseSource = new UserTableController();
    let argument = new SearchArgument();
    argument.query = req.params.query;
           
    databaseSource.connect((err : Error) => {
        let res = databaseSource.search(argument, (users) => {
            var data = "";
            users.forEach(user => {
                data = data + "\n" + user.email;
                //resp.write(company.toString());
            }); 
                
            console.log("klaar");
            databaseSource.close();
            
            resp.send(data);
        }, dataBaseErrorHandler);
    });
}

function dataBaseErrorHandler(err : Error) : void {
    console.log("error in handling database request");
    console.log(err);
}