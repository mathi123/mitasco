import { Component } from '@angular/core';
import { Todo } from "../../shared/Todo";
import { TodoDetailComponent } from "./todo-detail.component";
import { TodoService } from "../../services/todo.service";
import { SearchArgument } from "../../shared/SearchArgument";
import { PartialResultList } from "../../shared/PartialResultList";

@Component({
    selector: 'todo-list',
    template: 
        `
        <h2>Todo's</h2>
        <button (click)="addTodo()">Nieuw</button>
        <input [(ngModel)]="query" (input)="queryChanged()" placeholder="zoeken..."/>
        <ul>
             <li *ngFor="let todo of todos"
                 (click)="onSelect(todo)">
                <input type="checkbox" [(ngModel)]="todo.isDone"/>
                {{todo.description}}
                <button (click)="remove(todo)">x</button>
           </li>
        </ul>
        <div *ngIf="selected">
            <h3>Edit</h3>
            <todo-detail [todo]="selected"></todo-detail>
        </div>
        `,
    directives: [TodoDetailComponent],
    providers: [TodoService]
})
export class TodoListComponent {
    query: string = "";
    todos: Todo[] = [];
    selected: Todo;

    constructor(private todoService: TodoService){

    }

    public onSelect(todo: Todo){
        this.selected = todo;
    }

    public queryChanged(){
        this.search();
    }

    public ngOnInit(){
        this.search();
    }

    public addTodo(){
        let newTodo = new Todo();
        newTodo.id = this.todoService.CreateTodo(newTodo);

        this.todos.push(newTodo);
        this.selected = newTodo;
    }

    public remove(todo: Todo){
        this.todoService.remove(todo.id);
        this.todos.splice(this.todos.indexOf(todo, 0), 1);
    }

    private search(){
        let arg = new SearchArgument();
        arg.query = this.query;
        arg.skip = 0;
        arg.take = 15;

        this.todoService.SearchTodos(arg)
            .then((results: PartialResultList<Todo>) => {
                this.todos = results.results;

                this.selected = this.todos[0];
            });
    }
}