import { Component, OnInit } from "@angular/core";
import { GroupService } from "../../services/group.service";
import { Group } from "../../shared/group";
import { Router } from "@angular/router";
import { ConfigurationProvider } from "../../providers/configuration.provider";

@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: 'group-list.component.html'
})
export class GroupListComponent implements OnInit {
    public records: Group[] = [];

    constructor(private service: GroupService, private router: Router,
                private configuration: ConfigurationProvider) {
    }

    ngOnInit() {
        if (!this.configuration.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.loadData();
    }

    open(group: Group) {
        this.router.navigate(['/group-detail', group.id]);
    }

    create() {
        this.router.navigate(['/group-detail', 0]);
    }

    remove(group: Group) {
        let confirmed: boolean = window.confirm("Weet u zeker dat u deze wilt wissen?");

        if (confirmed) {
            this.service.remove(group.id)
                .then((success: boolean) => {
                    if (success) {
                        this.records.splice(this.records.indexOf(group), 1);
                    } else {
                        console.debug("het verwijderen is mislukt");
                    }
                })
                .catch((err) => console.error(err));
        }
    }

    private loadData() {
        this.service.getAll()
            .then((groups: Group[]) => this.records = groups);
    }
}