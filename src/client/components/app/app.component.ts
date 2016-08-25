import { Component } from '@angular/core';
import { TodoListComponent } from "../todo/todo-list.component";

@Component({
    selector: 'application-root',
    template: `
        <h1>Mitasco</h1>
        <router-outlet></router-outlet>
        `,
    directives: [TodoListComponent]
})
export class AppComponent { }