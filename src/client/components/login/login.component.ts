import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../server-api/authentication.service";
import { Credentials } from "../../shared/credentials";
import { MenuService } from "../../services/menu.service";
import { Router } from "@angular/router";
import { ConfigurationService } from "../../server-api/configuration.service";
import { UrlTrackingService } from "../../services/url-tracking.service";
import { LoginResult } from "../../shared/login-result";
import { UserSettingsService } from "../../services/user-settings.service";

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    public username: string = "0.0485660610351879@gmail.com";
    public password: string = "test";

    constructor(private authenticationService: AuthenticationService, private menu: MenuService,
                private router: Router, private config: ConfigurationService, private urlTracking: UrlTrackingService,
                private userSettings: UserSettingsService) {

    }

    ngOnInit(): void {
        if (this.config.isLoggedIn()) {
            // Already logged in
            this.router.navigate(['/dashboard']);
            return;
        } else {
            this.menu.showMenu(false);
        }
    }

    public login() {
        let credentials = new Credentials();
        credentials.email = this.username;
        credentials.password = this.password;

        this.authenticationService.Authenticate(credentials)
            .then((loginResult: LoginResult) => {
                if (loginResult) {
                    this.menu.showMenu(true);
                    this.config.setToken(loginResult.token);
                    this.userSettings.initialize(loginResult);

                    let url = this.urlTracking.originalUrl;
                    this.router.navigate([url || "/dashboard"]);
                } else {
                    console.log("error!")
                }
            })
            .catch(() => console.log("error!"));
    }

    public register() {
        this.router.navigate(['register']);
    }
}