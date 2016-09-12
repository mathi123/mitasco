import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'dashboard',
    template: `
    <div>        
        <login-form></login-form>
    </div>
        `,
    viewProviders:[LoginComponent]
})
export class DashboardComponent { }