import { Component } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { Credentials } from "../../shared/credentials";

@Component({
    selector: 'login-form',
    template: `
<div>
    <table>
        <tr>
            <td>Login</td>
            <td>
               <input type="text" [(ngModel)]="username"/>
            </td>
        </tr>
        <tr>
            <td>Paswoord</td>
            <td>
               <input type="password" [(ngModel)]="password"/>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <button type="button" (click)="login()" name="btnClick" class="btn-normal">Banaan</button>
            </td>
        </tr>
    </table>
</div>
        `,
    providers: [AuthenticationService]
})
export class LoginComponent {
    public username:string="0.42208382520671583@gmail.com";
    public password:string="test";

    constructor(private authenticationService:AuthenticationService){

    }

    public login(){
        let credentials = new Credentials();
        credentials.email = this.username;
        credentials.password = this.password;

        this.authenticationService.Authenticate(credentials)
            .then((success:Boolean) => {
                if(success){
                    console.log("success!")
                }else{
                    console.log("error!")
                }
            })
            .catch(() => console.log("error!"));
    }
}