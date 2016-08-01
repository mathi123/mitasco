import { Injectable } from '@angular/core'
import { Todo } from "../shared/Todo";
import { SearchArgument } from "../shared/SearchArgument";
import { PartialResultList } from "../shared/PartialResultList";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService{
    public constructor(private http: Http){

    }
    public SearchTodos(arg: SearchArgument) : Promise<PartialResultList<Todo>>{
        console.log("searching");
        let result = this.http.get(`http://localhost:3000/api/todo?query=${arg.query}&skip=${arg.skip}&take=${arg.take}`);
            //result.map((r: Response) => r.json().data as PartialResultList<Todo>);
        return result.toPromise()
            .then((r: Response) => r.json() as PartialResultList<Todo>)
            .catch((err: Error) => console.log(err));
    }
    public CreateTodo(todo: Todo): number{
        return 0;
    }
    public remove(id: number){

    }
}