import { Injectable } from "@angular/core";
import { Credentials } from "../shared/credentials";
import { Http, Response } from "@angular/http";
import { ConfigurationProvider } from "../providers/configuration.provider";

@Injectable()
export class AuthenticationService{
    public constructor(private http: Http,private config:ConfigurationProvider){

    }

    public Authenticate(credentials:Credentials):Promise<boolean>{
        return this.http.post(`${this.config.getBaseUrl()}/token`, JSON.stringify(credentials))
            .toPromise()
            .then((r: Response) => {
                let token = r.json() as string;
                this.config.setToken(token);
            })
            .catch((err: Error) => console.log(err));
    }
}