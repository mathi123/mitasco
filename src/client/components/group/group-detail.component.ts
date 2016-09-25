import { Component, OnInit } from "@angular/core";
import { Group } from "../../shared/group";
import { GroupService } from "../../services/group.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { KeyValuePair } from "../../shared/key-value-pair";
import { PermissionCode } from "../../shared/permission-code";
import { ConfigurationProvider } from "../../providers/configuration.provider";
import { User } from "../../shared/user";
import { UserService } from "../../services/user.service";
import { SearchArgument } from "../../shared/search-argument";
import { PartialResultList } from "../../shared/partial-result-list";

@Component({
    moduleId: module.id,
    selector: 'group-detail',
    templateUrl: 'group-detail.component.html'
})
export class GroupDetailComponent implements OnInit {
    private sub: Subscription;
    private id: number;

    public record: Group = new Group();
    public hasChanged: Boolean = false;
    public isSaving: Boolean = false;

    // User search
    private users: User[];
    private selectedUser: User;

    constructor(private service: GroupService, private route: ActivatedRoute,
                private configuration: ConfigurationProvider, private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        if (!this.configuration.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        } else {
            this.sub = this.route.params.subscribe(params => {
                this.id = params['id'] as number;

                if (this.id == 0) {
                    this.newData();
                } else {
                    this.loadData();
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    newData() {
        this.record = new Group();
        this.hasChanged = true;
    }

    changed() {
        this.hasChanged = true;
    }

    removeUser(user: KeyValuePair) {
        let index = this.record.users.indexOf(user);
        if (index >= 0) {
            let confirmed: boolean = window.confirm("Weet u zeker dat u deze wil wissen?");

            if (confirmed) {
                this.record.users.splice(index, 1);
                this.hasChanged = true;
            }
        }
    }

    removePermission(permission: PermissionCode) {
        let index = this.record.permissionCodes.indexOf(permission);
        if (index >= 0) {
            let confirmed: boolean = window.confirm("Weet u zeker dat u deze wil wissen?");

            if (confirmed) {
                this.record.permissionCodes.splice(index, 1);
                this.hasChanged = true;
            }
        }
    }

    cancel() {
        if (this.record.id == 0) {
            this.router.navigate(['/group-list']);
        } else if (this.hasChanged) {
            let confirmed: boolean = window.confirm("Wilt u de wijzigingen ongedaan maken?");

            if (confirmed) {
                this.loadData();
            }
        }
    }

    save() {
        this.isSaving = true;

        if (this.record.id == 0) {
            this.service.create(this.record)
                .then((id: number) => {
                    this.router.navigate(['/group-detail', id]);
                }).catch((err) => console.log(err));
        } else {
            this.service.update(this.record)
                .then((success: Boolean) => {
                    this.isSaving = false;
                    this.hasChanged = false;
                }).catch((err) => console.log(err));
        }
    }

    userSelected(user: User) {
        if (user && user.id !== 0) {
            let newUser = new KeyValuePair();
            newUser.key = user.id;
            newUser.value = user.fullname;
            this.record.users.push(newUser);
            this.selectedUser = null;
        }
    }

    private loadData() {
        this.service.read(this.id)
            .then((group: Group) => {
                this.record = group;
                this.hasChanged = false;
            });
        this.searchUsers();
    }

    private searchUsers() {
        let arg = new SearchArgument();
        arg.query = '';
        arg.skip = 0;
        arg.take = 15;

        this.userService.search(arg)
            .then((result: PartialResultList<User>) => {
                this.users = result.results;
            }).catch((err) => console.log(err));
    }
}