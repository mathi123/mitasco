import { QueryConfig } from "pg";
import { DbClient } from "../db-client";
import { QueryNames } from "./query-names";
import { Language } from "../shared/language";

export class LanguageController {
    public async getAll(): Promise<Language[]> {
        let query: QueryConfig = {
            name: QueryNames.LanguageGetAll,
            text: `
            SELECT lan.id, lan.name_nl
            FROM language lan
            ORDER BY lan.id ASC`
        };

        let result = await DbClient.Instance().query(query);

        return result.map(this.ParseArray);
    }

    private ParseArray(row: any): Language {
        let rec = new Language();
        rec.id = row['id'];
        rec.name = row['name_nl'];
        return rec;
    }
}