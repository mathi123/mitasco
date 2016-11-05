import { Component, Input } from "@angular/core";
import { Todo } from "../../shared/todo";
import { TodoService } from "../../server-api/todo.service";

@Component({
    moduleId: module.id,
    selector: 'todo-detail',
    templateUrl: 'todo-detail.component.html'
})
export class TodoDetailComponent {
    @Input()
    todo: Todo;

    constructor(private _todoService: TodoService) {

    }

    todoChanged() {
        this._todoService.update(this.todo)
            .then((success: boolean) => console.info(success ? "update gelukt" : "update mislukt"));
    }
}