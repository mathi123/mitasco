import { Component } from '@angular/core';
import { TodoListComponent } from "../todo/todo-list.component";
@Component({
    selector: 'application-root',
    template: `
        <h1>Mitasco</h1>
        <todo-list></todo-list>
        `,
    directives: [TodoListComponent]
})
export class AppComponent { }