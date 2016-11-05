import { Injectable } from "@angular/core";
import { Todo } from "../shared/todo";
import { SearchArgument } from "../shared/search-argument";
import { PartialResultList } from "../shared/partial-result-list";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { TodoServiceInterface } from "../shared/todo-service-interface";
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class TodoService implements TodoServiceInterface {

    public constructor(private http: Http, private config: ConfigurationService) {

    }

    public search(arg: SearchArgument): Promise<PartialResultList<Todo>> {
        return this.http.get(`${this.config.getBaseUrl()}/todo?query=${arg.query}&skip=${arg.skip}&take=${arg.take}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as PartialResultList<Todo>)
            .catch((err: Error) => console.log(err));
    }

    public create(todo: Todo): Promise<number> {
        return this.http.post(`${this.config.getBaseUrl()}/todo`, JSON.stringify(todo), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as number)
            .catch((err: Error) => console.log(err));
    }

    public read(id: number): Promise<Todo> {
        return this.http.get(`${this.config.getBaseUrl()}/todo/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as Todo)
            .catch((err: Error) => console.log(err));
    }

    public update(todo: Todo): Promise<boolean> {
        return this.http.put(`${this.config.getBaseUrl()}/todo`, JSON.stringify(todo), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

    public remove(id: number): Promise<boolean> {
        return this.http.delete(`${this.config.getBaseUrl()}/todo/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }
}