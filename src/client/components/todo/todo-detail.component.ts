import {Component,Input} from '@angular/core'
import { Todo } from "../../shared/Todo";

@Component({
    selector: 'todo-detail',
    template: `
    <div>
        <input [(ngModel)]="todo.description" placeholder="omschrijving"/>
    </div>
    `
})
export class TodoDetailComponent{
    @Input()
    todo: Todo;
}