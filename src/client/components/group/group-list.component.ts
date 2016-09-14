import { Component, OnInit } from '@angular/core';
import { GroupService } from "../../services/group.service";
import { Group } from "../../shared/group";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'group-list',
    template: `
    <div>
        <table class="simple-table">
            <tr class="simple-table-header">
                <td>Omschrijving</td>
                <td>Gebruikers</td>
                <td>Permissies</td>
            </tr>
            <tr *ngFor="let record of records">
                <td><a (click)="open(record)" class="link">{{record.description}}</a></td>
                <td>{{record.userCount}}</td>
                <td>{{record.permissionCount}}</td>
            </tr>
        </table>
    </div>
    `
})
export class GroupListComponent implements OnInit {
    public records:Group[] = [];

    constructor(private service:GroupService, private router: Router) { }

    ngOnInit() {
        this.loadData();
    }

    open(group:Group){
        this.router.navigate(['/group-detail', group.id]);
    }

    private loadData(){
        this.service.getAll()
            .then((groups:Group[]) => this.records = groups);
    }
}