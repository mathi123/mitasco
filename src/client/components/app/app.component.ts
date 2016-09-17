import { Component } from '@angular/core';
import { TodoListComponent } from "../todo/todo-list.component";

@Component({
    selector: 'application-root',
    template: `
    <div>
        <div id="topbar">
            <p class="logo">Mitasco</p>
        </div>
        <div id="wrapper">
            <div id="sidebar">
                <accordion>
                    <accordion-group heading="Algemeen" isGroupOpen="true">
                        <ul>
                            <li><p routerLink="/todo-list">Todo's</p></li>
                        </ul>
                    </accordion-group>
                    <accordion-group heading="Admin" isGroupOpen="true">
                        <ul>
                            <li><p routerLink="/group-list">Groepen</p></li>
                            <li><p>Gebruikers</p></li>
                            <li><p>Permissies</p></li>
                        </ul>
                    </accordion-group>
                </accordion>
            </div>
            <div id="content">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
        `,
    viewProviders: [TodoListComponent]
})
export class AppComponent { }