import { Component, OnInit, Input } from '@angular/core';
import { Group } from "../../shared/group";
import { GroupService } from "../../services/group.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { KeyValuePair } from "../../shared/key-value-pair";
import { PermissionCode } from "../../shared/permission-code";
import { ConfigurationProvider } from "../../providers/configuration.provider";

@Component({
    moduleId: module.id,
    selector: 'group-detail',
    templateUrl: 'group-detail.template.html'
})
export class GroupDetailComponent implements OnInit {
    private sub: Subscription;
    private id:number;

    public record:Group = new Group();
    public hasChanged:Boolean = false;
    public saving:Boolean = false;

    constructor(private service:GroupService, private route: ActivatedRoute,
                private configuration: ConfigurationProvider, private router: Router) { }

    ngOnInit() {
        if(!this.configuration.isLoggedIn()){
            this.router.navigate(['/login']);
            return;
        }else{
            this.sub = this.route.params.subscribe(params => {
                this.id = params['id'] as number;
                this.loadData();
            });
        }
    }

    ngOnDestroy() {
        if(this.sub){
            this.sub.unsubscribe();
        }
    }

    changed(){
        this.hasChanged = true;
    }

    removeUser(user:KeyValuePair){
        let index = this.record.users.indexOf(user);
        if(index >= 0){
            this.record.users.splice(index, 1);
            this.hasChanged = true;
        }
    }

    removePermission(permission:PermissionCode){
        let index = this.record.permissionCodes.indexOf(permission);
        if(index >= 0){
            this.record.permissionCodes.splice(index, 1);
            this.hasChanged = true;
        }
    }

    save(){
        this.saving = true;

        this.service.update(this.record)
            .then((success:Boolean) => {
                this.saving = false;
                this.hasChanged = false;
            }).catch((err) => console.log(err));
    }

    private loadData(){
        this.service.read(this.id)
            .then((group:Group) => {
                this.record = group;
            });
    }
}