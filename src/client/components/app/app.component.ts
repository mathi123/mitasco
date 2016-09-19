import { Component } from '@angular/core';
import { TodoListComponent } from "../todo/todo-list.component";
import { MenuProvider } from "../../providers/menu.provider";

@Component({
    selector: 'application-root',
    template: `
    <div>
        <header id="header">
            <button type="button" (click)="toggleMenu()">menu</button>
        </header>
        
        <menu id="menu"></menu>

        <div id="content">
            <router-outlet></router-outlet>
        </div>
    </div>
        `,
    viewProviders: [TodoListComponent]
})
export class AppComponent {
    constructor(private menu:MenuProvider){
    }

    public toggleMenu(){
        this.menu.toggle();
    }
}