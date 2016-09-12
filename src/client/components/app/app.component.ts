import { Component,ComponentMetadataType } from '@angular/core';
import { TodoListComponent } from "../todo/todo-list.component";

@Component({
    selector: 'application-root',
    template: `
    <div>
        <div id="topbar">
            
        </div>
        <div id="wrapper">
            <div id="sidebar">
                <accordion>
                    <accordion-group heading="Algemeen" isGroupOpen="true">
                        <ul>
                            <li><p routerLink="/todo-list">Todo's</p></li>
                            <li><p routerLink="/todo-list">Zaken</p></li>
                        </ul>
                    </accordion-group>
                    <accordion-group heading="Admin" isGroupOpen="true">
                        <ul>
                            <li><p>Groepen</p></li>
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