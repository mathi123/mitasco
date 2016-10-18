import { QueryConfig } from "pg";
import { DbClient } from "../db-client";
import { QueryNames } from "./query-names";
import { Country } from "../shared/country";

export class CountryController {
    public async getAll(filterPriority: boolean): Promise<Country[]> {
        let query: QueryConfig = {
            name: QueryNames.CountryGetAll,
            text: `
            SELECT cnt.id, cnt.name_nl, cnt.priority 
            FROM country cnt
            WHERE $1 = FALSE OR cnt.priority = TRUE
            ORDER BY cnt.name_nl ASC`,
            values: [filterPriority]
        };

        let result = await DbClient.Instance().query(query);

        return result.map(this.ParseArray);
    }

    private ParseArray(row: any): Country {
        let rec = new Country();
        rec.id = row['id'];
        rec.name = row['name_nl'];
        rec.priority = row['priority'];
        return rec;
    }
}