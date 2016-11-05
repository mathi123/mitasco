import { Injectable } from "@angular/core";
import { User } from "../shared/user";
import { LoginResult } from "../shared/login-result";
import { Subject } from "rxjs/Subject";

@Injectable()
export class UserSettingsService {
    private loggedUser: User;
    private permissions: string[];

    public userSettingsChanged = new Subject();

    constructor() {
    }

    initialize(loginResult: LoginResult) {
        this.loggedUser = loginResult.user;
        this.permissions = loginResult.permissions;

        this.userSettingsChanged
            .next();
    }

    getUser() {
        return this.loggedUser;
    }

    getPermissions() {
        return this.permissions;
    }
}