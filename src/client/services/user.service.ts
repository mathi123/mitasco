import { UserServiceInterface } from "../shared/user-service-interface";
import { Injectable } from "@angular/core";
import { User } from "../shared/user";
import { PartialResultList } from "../shared/partial-result-list";
import { SearchArgument } from "../shared/search-argument";
import { Http, Response } from "@angular/http";
import { ConfigurationProvider } from "../providers/configuration.provider";

@Injectable()
export class UserService implements UserServiceInterface{

    constructor(private http:Http, private config:ConfigurationProvider){

    }

    search(arg: SearchArgument): Promise<PartialResultList<User>> {
        return this.http.get(`${this.config.getBaseUrl()}/user?query=${arg.query}&skip=${arg.skip}&take=${arg.take}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as PartialResultList<User>)
            .catch((err: Error) => console.log(err));
    }

    remove(id: number): Promise<boolean> {
        return this.http.delete(`${this.config.getBaseUrl()}/user/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

    read(id: number): Promise<User> {
        return this.http.get(`${this.config.getBaseUrl()}/user/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as User)
            .catch((err: Error) => console.log(err));
    }

    update(user: User): Promise<boolean> {
        return this.http.post(`${this.config.getBaseUrl()}/user`, JSON.stringify(user), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

}