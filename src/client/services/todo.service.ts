import { Injectable } from '@angular/core'
import { Todo } from "../shared/Todo";
import { SearchArgument } from "../shared/search-argument";
import { PartialResultList } from "../shared/partial-result-list";
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { TodoServiceInterface } from "../shared/todo-service-interface";

@Injectable()
export class TodoService implements TodoServiceInterface{
    private _headers: Headers = new Headers();
    private _options: RequestOptions;
    private _baseUrl: string;

    public constructor(private http: Http){
        this._headers = new Headers({ 'Content-Type': 'application/json' });
        this._options = new RequestOptions({ headers: this._headers });
        this._baseUrl = 'https://localhost:3000/api';
    }

    public search(arg: SearchArgument): Promise<PartialResultList<Todo>> {
        return this.http.get(`${this._baseUrl}/todo?query=${arg.query}&skip=${arg.skip}&take=${arg.take}`)
            .toPromise()
            .then((r: Response) => r.json() as PartialResultList<Todo>)
            .catch((err: Error) => console.log(err));
    }

    public create(todo: Todo): Promise<number> {
        return this.http.post(`${this._baseUrl}/todo`, JSON.stringify(todo), this._options)
            .toPromise()
            .then((r: Response) => r.json() as number)
            .catch((err: Error) => console.log(err));
    }

    public read(id: number): Promise<Todo> {
        return this.http.get(`${this._baseUrl}/todo/${id}`)
            .toPromise()
            .then((r: Response) => r.json() as Todo)
            .catch((err: Error) => console.log(err));
    }

    public update(todo: Todo): Promise<boolean> {
        return this.http.post(`${this._baseUrl}/todo`, JSON.stringify(todo), this._options)
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

    public remove(id: number): Promise<boolean> {
        return this.http.delete(`${this._baseUrl}/todo/${id}`)
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }
}