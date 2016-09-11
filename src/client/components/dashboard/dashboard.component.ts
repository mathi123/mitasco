import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";

@Component({
    selector: 'dashboard',
    template: `
    <div>
        <ul>
            <li><a routerLink="/todo-list">Todo's</a></li>
            <li><a routerLink="/group-list">Groepen</a></li>
        </ul>
        <login-form></login-form>
    </div>
        `,
    viewProviders:[LoginComponent]
})
export class DashboardComponent { }