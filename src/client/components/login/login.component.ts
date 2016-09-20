import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Credentials } from "../../shared/credentials";
import { MenuProvider } from "../../providers/menu.provider";
import { Router } from "@angular/router";
import { ConfigurationProvider } from "../../providers/configuration.provider";
import { UrlTrackingService } from "../../services/url-tracking.service";

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: 'login.template.html',
    providers: [AuthenticationService, MenuProvider]
})
export class LoginComponent implements OnInit{
    public username:string="0.0485660610351879@gmail.com";
    public password:string="test";

    constructor(private authenticationService:AuthenticationService, private menu:MenuProvider,
        private router:Router, private config:ConfigurationProvider, private urlTracking: UrlTrackingService){

    }

    ngOnInit(): void {
        if(this.config.isLoggedIn()){
            // Already logged in
            this.router.navigate(['/dashboard']);
            return;
        }else{
            this.menu.showMenu(false);
        }
    }

    public login(){
        let credentials = new Credentials();
        credentials.email = this.username;
        credentials.password = this.password;

        this.authenticationService.Authenticate(credentials)
            .then((success:Boolean) => {
                if(success){
                    this.menu.showMenu(true);
                    this.router.navigate(['/dashboard']);
                }else{
                    console.log("error!")
                }
            })
            .catch(() => console.log("error!"));
    }
}