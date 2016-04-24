import { CustomerTableController } from './DataStore/CustomerTableController';
import { SearchArgument } from './DTOs/SearchArgument';
import * as express from 'express';
import * as http from 'http';

// Routes
import * as route_index from './routes/index.route';
import * as route_company from './routes/company.route';
import * as route_user from './routes/user.route';

class StartUp {
    public static main(): number {
        let app =  express();
        
        app.set('port', process.env.PORT || 3000);
        
        // Configure routes
        route_index.configureRoute(app);
        route_company.configureRoute(app);
        route_user.configureRoute(app);
        
        http.createServer(app).listen(app.get('port'), function(){
            console.log("Express server listening on port " + app.get('port'));
            });
        /*console.log('Hello world!');

        let customerQueryer = new CustomerTableController();
        let argument = new SearchArgument();
        
        customerQueryer.connect((err : Error) => {
            console.log('verbinding gemaakt gelukt');
        
            argument.query = "Mat";
            let res = customerQueryer.search(argument, (companies) => {
                companies.forEach(company => {
                    console.log(company.toString());
                }); 
                
                console.log("klaar");
                customerQueryer.close();
                
            }, StartUp.dataBaseErrorHandler);
        });*/
        
        return 0;
    }
    
    public static dataBaseErrorHandler(err : Error) : void {
        console.log("error in handling database request");
        console.log(err);
    }
}

StartUp.main();
