import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { ConfigurationProvider } from "../providers/configuration.provider";
import { Language } from "../shared/language";

@Injectable()
export class LanguageService {
    constructor(private http: Http, private config: ConfigurationProvider) {
    }

    getAll(): Promise<Language[]> {
        return this.http.get(`${this.config.getBaseUrl()}/language`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as Language[])
            .catch((err: Error) => console.log(err));
    }
}