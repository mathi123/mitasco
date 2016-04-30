import { QueryConfig } from 'pg';

import { AbstractTableController } from './AbstractTableController';
import { Company } from '../DTOs/Company';
import { SearchArgument } from '../DTOs/SearchArgument';
import { QueryNames } from './QueryNames';

export class CustomerTableController extends AbstractTableController {

    constructor() {
        super();
    }

    public search(argument: SearchArgument, success: (results: Company[]) => void, failed: (err: Error) => void): void {
        let preparedStatement: QueryConfig = {
            name: QueryNames.CustomerTable_Search,
            text: 'SELECT * FROM Customer WHERE Name Like $1',
            values: ['%' + argument.query + '%']
        };

        let query = this._client.query(preparedStatement, (err, result) => {

            if (err) {
                failed(err);
            }
            else {
                let searchResult = result.rows.map((row) => {
                    let rec = new Company();
                    rec.email = row['email'];
                    rec.name = row['name'];
                    rec.fax = row['fax'];
                    return rec;
                });

                success(searchResult);
            }
        });
    }
}
