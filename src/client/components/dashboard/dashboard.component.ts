import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'dashboard',
    template: `
    <div>
        <a routerLink="/todo-list">Todo's</a>
        <login-form></login-form>
    </div>
        `,
    viewProviders:[LoginComponent]
})
export class DashboardComponent { }