import { UserServiceInterface } from "../shared/user-service-interface";
import { Injectable } from "@angular/core";
import { User } from "../shared/user";
import { PartialResultList } from "../shared/partial-result-list";
import { SearchArgument } from "../shared/search-argument";
import { Http, Response } from "@angular/http";
import { ConfigurationService } from "./configuration.service";
import { RegistrationData } from "../shared/registration-data";

@Injectable()
export class UserService implements UserServiceInterface {

    constructor(private http: Http, private config: ConfigurationService) {

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

    create(user: User, password: string): Promise<number> {
        let data = new RegistrationData();
        data.fullName = user.fullname;
        data.email = user.email;
        data.password = password;

        return this.http.put(`${this.config.getBaseUrl()}/user`, JSON.stringify(data), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as number)
            .catch((err: Error) => console.log(err));
    }
}