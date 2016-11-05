import { Injectable } from "@angular/core";
import { Credentials } from "../shared/credentials";
import { Http, Response } from "@angular/http";
import { ConfigurationService } from "./configuration.service";
import { LoginResult } from "../shared/login-result";
import { UserSettingsService } from "../services/user-settings.service";

@Injectable()
export class AuthenticationService {
    public constructor(private http: Http, private config: ConfigurationService, private userSettings: UserSettingsService) {

    }

    public Authenticate(credentials: Credentials): Promise<LoginResult> {
        return this.http.post(`${this.config.getBaseUrl()}/token`, JSON.stringify(credentials), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => {
                let loginResult = r.json() as LoginResult;
                return loginResult;
            })
            .catch((err: Error) => {
                console.log(err);
                return null;
            });
    }
}