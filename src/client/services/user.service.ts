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

    create(user: User, password: string): Promise<number> {
        return undefined;
    }

    remove(id: number): Promise<boolean> {
        return undefined;
    }

    read(id: number): Promise<User> {
        return undefined;
    }

    update(user: User): Promise<boolean> {
        return undefined;
    }

}