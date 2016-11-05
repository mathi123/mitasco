import { QueryConfig } from "pg";
import { PartialResultList } from "../shared/partial-result-list";
import { SearchArgument } from "../shared/search-argument";
import { QueryNames } from "./query-names";
import { DbClient } from "../db-client";
import { Company } from "../shared/company";

export class CompanyController {
    public async search(argument: SearchArgument): Promise<PartialResultList<Company>> {
        let countQuery: QueryConfig = {
            name: QueryNames.CustomerTableSearchCount,
            text: `SELECT COUNT(*) FROM company 
            WHERE name LIKE $1 OR email LIKE $1`,
            values: ['%' + argument.query + '%']
        };

        let countResult = await DbClient.Instance().query(countQuery);

        let total = countResult[0]['count'];

        if (total <= argument.skip) {
            argument.skip = 0;
        }

        let selectQuery: QueryConfig = {
            name: QueryNames.TodoTableSearch,
            text: `SELECT * FROM company
            WHERE name LIKE $1 OR email LIKE $1
            ORDER BY name ASC
            OFFSET $2 LIMIT $3`,
            values: ['%' + argument.query + '%', argument.skip, argument.take]
        };

        let selectResult = await DbClient.Instance().query(selectQuery);

        let searchResult = new PartialResultList<Company>();
        searchResult.count = total;
        searchResult.skipped = argument.skip;
        searchResult.results = selectResult.map(this.ArrayToCompany);
        return searchResult;
    }

    public async create(company: Company): Promise<number> {
        let query: QueryConfig = {
            name: QueryNames.CompanyTableCreate,
            text: `INSERT INTO company (name, email, phone, cell, fax, url, street, zip, city, country_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
            values: [company.name, company.email, company.phone, company.cell, company.fax, company.url, company.street,
                company.zip, company.city, company.country ? company.country.id : null]
        };
        let result = await DbClient.Instance().query(query);
        return result[0]['id'];
    }

    public async remove(id: number): Promise<boolean> {
        let query: QueryConfig = {
            name: QueryNames.CompanyTableRemove,
            text: "DELETE FROM company WHERE id = $1",
            values: [id]
        };

        await DbClient.Instance().query(query);

        return true;
    }

    public async read(id: number): Promise<Company> {
        let query: QueryConfig = {
            name: QueryNames.CompanyTableRead,
            text: "SELECT * FROM company WHERE id = $1",
            values: [id]
        };

        let result = await DbClient.Instance().query(query);
        let rec = this.ArrayToCompany(result[0]);
        return rec;
    }

    public async update(company: Company): Promise<boolean> {
        let query: QueryConfig = {
            name: QueryNames.CompanyTableUpdate,
            text: `UPDATE company 
                    SET name = $2, 
                        email = $3, 
                        phone = $4, 
                        cell = $5, 
                        fax = $6, 
                        url = $7, 
                        street = $8, 
                        zip = $9, 
                        city = $10, 
                        country_id = $11
                    WHERE id = $1`,
            values: [company.id, company.name, company.email, company.phone, company.cell, company.fax,
                company.url, company.street, company.zip, company.city, company.country ? company.country.id : null]
        };

        try {
            await DbClient.Instance().query(query);
        }
        catch (err) {
            console.error(err);
        }
        return true;
    }

    private ArrayToCompany(row: any): Company {
        let rec = new Company();

        rec.id = row['id'];
        rec.name = row['name'];
        rec.email = row['email'];
        rec.phone = row['phone'];
        rec.cell = row['cell'];
        rec.fax = row['fax'];
        rec.url = row['url'];
        rec.street = row['street'];
        rec.zip = row['zip'];
        rec.city = row['city'];

        return rec;
    }
}
