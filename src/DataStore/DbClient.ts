import * as pgPromise from "pg-promise";
import { IDatabase } from "pg-promise";
import * as fs from "fs";

var pgp = pgPromise({});

export class DbClient {
    private static _client: IDatabase<any>;

    public static Instance(): IDatabase<any> {
        if (!this._client) {
            console.log(path.join(__dirname, "../pgconf.json"));
            let pgconfig = JSON.parse(fs.readFileSync(path.join(__dirname, "../pgconf.json"), "utf8"));
            this._client = pgp(pgconfig);
        }

        return this._client;
    }
}