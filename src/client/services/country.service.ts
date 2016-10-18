import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { ConfigurationProvider } from "../providers/configuration.provider";
import { Country } from "../shared/country";

@Injectable()
export class CountryService {

    constructor(private http: Http, private config: ConfigurationProvider) {
    }

    getAll(priority: boolean): Promise<Country[]> {
        return this.http.get(`${this.config.getBaseUrl()}/country${priority ? "&priority=1" : ""}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as Country[])
            .catch((err: Error) => console.log(err));
    }
}