import { Component, OnInit, Input } from '@angular/core';
import { Group } from "../../shared/group";
import { GroupService } from "../../services/group.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { KeyValuePair } from "../../shared/key-value-pair";
import { PermissionCode } from "../../shared/permission-code";

@Component({
    moduleId: module.id,
    selector: 'group-detail',
    template:
    `
    <div>
        <input type="text" [(ngModel)]="record.description" (input)="changed()"/>
        <p>Gebruikers</p>
        <table border="1" *ngIf="record.users">
            <tr>
                <td>Naam</td>
                <td>Wissen</td>
            </tr>
            <tr *ngFor="let user of record.users">
                <td>{{user.value}}</td>
                <td>
                    <a (click)="removeUser(user)">x</a>
                </td>
            </tr>
        </table>
        <p>Permissies</p>
        <table border="1" *ngIf="record.permissionCodes">
            <tr>
                <td>Code</td>
                <td>Wissen</td>
            </tr>
            <tr *ngFor="let permission of record.permissionCodes">
                <td>{{permission.code}}</td>
                <td>
                    <a (click)="removePermission(permisson)">x</a>
                </td>
            </tr>
        </table>
        <button type="button" (click)="save()" [disabled]="!hasChanged">Opslaan</button>
    </div>
    `
})
export class GroupDetailComponent implements OnInit {
    private sub: Subscription;
    private id:number;

    public record:Group = new Group();
    public hasChanged:Boolean = false;
    public saving:Boolean = false;

    constructor(private service:GroupService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'] as number;
            this.loadData();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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