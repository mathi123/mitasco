import { QueryConfig } from 'pg'; 
import { QueryResult } from 'pg';

import { AbstractTableController } from './AbstractTableController';
import { User } from '../DTOs/User';
import { SearchArgument } from '../DTOs/SearchArgument';
import { QueryNames } from './QueryNames';

export class UserTableController extends AbstractTableController {
    
    constructor() {
        super();
    }
    
    public search(argument : SearchArgument, success : (results : User[]) => void, failed : (err : Error) => void) : void {
        let preparedStatement : QueryConfig = {
            name : QueryNames.UserTable_Search,
            text : 'SELECT * FROM users WHERE email Like $1',
            values : [ '%' + argument.query + '%']
        }; 
        
        let query = this._client.query(preparedStatement, (err, result) => {
            
            if(err)
            {
                failed(err);
            }
            else
            {
                let searchResult = result.rows.map((row) => 
                { 
                    let rec = new User();
                    rec.id = row['id'];
                    rec.email = row['email'];
                    return rec;
                });
                
                success(searchResult);
            }
        });
    }      
}