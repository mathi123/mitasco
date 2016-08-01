import { Component } from '@angular/core';
import { Todo } from "../../shared/Todo";
import { TodoDetailComponent } from "./todo-detail.component";

@Component({
    selector: 'todo-list',
    template: 
        `
        <h2>Todo's</h2>
        <input [(ngModel)]="query" placeholder="zoeken..."/>
        <ul>
             <li *ngFor="let todo of todos"
                 (click)="onSelect(todo)">
                <input type="checkbox" [(ngModel)]="todo.isDone"/>{{todo.description}}
           </li>   
        </ul>
        <h3>Edit</h3>
        <todo-detail [todo]="selected"></todo-detail>
        `,
    directives: [TodoDetailComponent]
})
export class TodoListComponent {
    query: string;
    todos: Todo[] = [];
    selected: Todo;

    constructor(){
        let a = new Todo();
        a.description = "code";
        a.isDone = true;
        let b = new Todo();
        b.description = "test";
        let c = new Todo();
        c.description = "deploy";

        this.todos.push(a);
        this.todos.push(b);
        this.todos.push(c);
        this.selected = a;
    }

    public onSelect(todo: Todo){
        this.selected = todo;
    }
}