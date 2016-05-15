import { Client } from "pg";
import * as fs from "fs";

export abstract class AbstractTableController {
    protected _client: Client;

    constructor() {
        var pgconfig = JSON.parse(fs.readFileSync("bin/pgconf.json", "utf8"));

        this._client = new Client(pgconfig);
    }

    public connect(callback?: (err: Error) => void) {
        this._client.connect(callback);
    }

    public close() {
        this._client.end();
    }
}
