import {Component,Input} from '@angular/core'
import { Todo } from "../../shared/todo";
import { TodoService } from "../../services/todo.service";

@Component({
    selector: 'todo-detail',
    template: `
    <div>
        <input [(ngModel)]="todo.description" (input)="todoChanged()" placeholder="omschrijving"/>
    </div>
    `
})
export class TodoDetailComponent{
    @Input()
    todo: Todo;

    constructor(private _todoService: TodoService){

    }

    todoChanged(){
        this._todoService.update(this.todo)
            .then((success: boolean) => console.info(success?"update gelukt":"update mislukt"));
    }
}