import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ConfigurationProvider } from "../../providers/configuration.provider";
import { SearchArgument } from "../../shared/search-argument";
import { PartialResultList } from "../../shared/partial-result-list";
import { User } from "../../shared/user";

@Component({
    moduleId: module.id,
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
    public query: string = 'test';
    public records: User[];

    constructor(private service: UserService, private router: Router, private configuration: ConfigurationProvider) {
    }

    ngOnInit() {
        if (!this.configuration.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        } else {
            this.loadData();
        }
    }

    private loadData() {
        let arg = new SearchArgument();
        arg.query = this.query;
        arg.skip = 0;
        arg.take = 10;

        this.service.search(arg)
            .then((data: PartialResultList<User>) => this.records = data.results)
            .catch((err) => console.log(err));
    }

    private queryChanged() {
        this.loadData();
    }
}