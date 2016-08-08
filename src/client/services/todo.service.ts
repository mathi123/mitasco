import { Injectable } from '@angular/core'
import { Todo } from "../shared/Todo";
import { SearchArgument } from "../shared/SearchArgument";
import { PartialResultList } from "../shared/PartialResultList";
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ITodoService } from "../shared/ITodoService";

@Injectable()
export class TodoService implements ITodoService{
    private _headers: Headers = new Headers();
    private _options: RequestOptions;

    public constructor(private http: Http){
        this._headers = new Headers({ 'Content-Type': 'application/json' });
        this._options = new RequestOptions({ headers: this._headers });
    }

    public search(arg: SearchArgument): Promise<PartialResultList<Todo>> {
        return this.http.get(`http://localhost:3000/api/todo?query=${arg.query}&skip=${arg.skip}&take=${arg.take}`)
            .toPromise()
            .then((r: Response) => r.json() as PartialResultList<Todo>)
            .catch((err: Error) => console.log(err));
    }

    public create(todo: Todo): Promise<number> {
        return this.http.post(`http://localhost:3000/api/todo`, JSON.stringify(todo), this._options)
            .toPromise()
            .then((r: Response) => r.json() as number)
            .catch((err: Error) => console.log(err));
    }

    public read(id: number): Promise<Todo> {
        return this.http.get(`http://localhost:3000/api/todo/${id}`)
            .toPromise()
            .then((r: Response) => r.json() as Todo)
            .catch((err: Error) => console.log(err));
    }

    public update(todo: Todo): Promise<boolean> {
        return this.http.post(`http://localhost:3000/api/todo`, JSON.stringify(todo), this._options)
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

    public remove(id: number): Promise<boolean> {
        return this.http.delete(`http://localhost:3000/api/todo/${id}`)
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }
}