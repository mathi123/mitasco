import * as pgPromise from "pg-promise";
import { IDatabase } from "pg-promise";
import * as fs from "fs";
import * as path from "path";

var pgp = pgPromise({});

export class DbClient {
    private static client: IDatabase<any>;

    public static Instance(): IDatabase<any> {
        if (!this.client) {
            let pgconfig = JSON.parse(fs.readFileSync(path.join(__dirname, "../pgconf.json"), "utf8"));
            this.client = pgp(pgconfig);
        }

        return this.client;
    }
}