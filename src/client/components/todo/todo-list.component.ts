import { Component, OnInit } from "@angular/core";
import { Todo } from "../../shared/todo";
import { TodoDetailComponent } from "./todo-detail.component";
import { TodoService } from "../../server-api/todo.service";
import { SearchArgument } from "../../shared/search-argument";
import { PartialResultList } from "../../shared/partial-result-list";
import { ConfigurationService } from "../../server-api/configuration.service";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    viewProviders: [TodoDetailComponent],
    providers: [TodoService]
})
export class TodoListComponent implements OnInit {
    query: string = "";
    todos: Todo[] = [];
    selected: Todo;

    constructor(private todoService: TodoService, private configuration: ConfigurationService,
                private router: Router) {

    }

    public ngOnInit() {
        if (!this.configuration.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        } else {
            this.search();
        }
    }

    public onSelect(todo: Todo) {
        this.selected = todo;
    }

    public queryChanged() {
        this.search();
    }

    public addTodo() {
        let newTodo = new Todo();
        newTodo.description = "test new todo";
        newTodo.isDone = false;
        newTodo.id = 0;

        this.todoService.create(newTodo)
            .then((id) => {
                newTodo.id = id;
                this.todos.push(newTodo);
                this.selected = newTodo;
            });
    }

    public remove(todo: Todo) {
        this.todoService.remove(todo.id)
            .then((success: boolean) => {
                if (success) {
                    this.todos.splice(this.todos.indexOf(todo, 0), 1);
                }
            });
    }

    private search() {
        let arg = new SearchArgument();
        arg.query = this.query;
        arg.skip = 0;
        arg.take = 15;

        this.todoService.search(arg)
            .then((results: PartialResultList<Todo>) => {
                this.todos = results.results;

                this.selected = this.todos[0];
            });
    }
}