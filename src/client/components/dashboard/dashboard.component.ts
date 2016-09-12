import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { AccordionComponent } from "../accordion/accordion.component";

@Component({
    selector: 'dashboard',
    template: `
    <div>        
        <login-form></login-form>
    </div>
        `,
    viewProviders:[LoginComponent,AccordionComponent]
})
export class DashboardComponent { }