import { QueryConfig } from "pg";
import { Company } from "../DTOs/Company";
import { SearchArgument } from "../DTOs/SearchArgument";
import { QueryNames } from "./QueryNames";
import { DbClient } from "./DbClient";

export class CustomerTableController {

    public async search(argument: SearchArgument): Promise<Company[]> {
        let preparedStatement: QueryConfig = {
            name: QueryNames.CustomerTable_Search,
            text: 'SELECT * FROM Customer WHERE Name Like $1',
            values: ['%' + argument.query + '%']
        };

        let result = await DbClient.Instance().query(preparedStatement);

        let searchResult = result.rows.map((row) => {
            let rec = new Company();
            rec.email = row['email'];
            rec.name = row['name'];
            rec.fax = row['fax'];
            return rec;
        });

        return searchResult;
    }
}
