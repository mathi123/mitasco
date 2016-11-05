import { Injectable } from "@angular/core";
import { Credentials } from "../shared/credentials";
import { Http, Response } from "@angular/http";
import { ConfigurationService } from "./configuration.service";
import { LoginResult } from "../shared/login-result";
import { UserSettingsService } from "./user-settings.service";

@Injectable()
export class AuthenticationService {
    public constructor(private http: Http, private config: ConfigurationService, private userSettings: UserSettingsService) {

    }

    public Authenticate(credentials: Credentials): Promise<boolean> {
        return this.http.post(`${this.config.getBaseUrl()}/token`, JSON.stringify(credentials), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => {
                let loginResult = r.json() as LoginResult;
                this.config.setToken(loginResult.token);
                this.userSettings.initialize(loginResult);
                return true;
            })
            .catch((err: Error) => {
                console.log(err);
                return false;
            });
    }
}