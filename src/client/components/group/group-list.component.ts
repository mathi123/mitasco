import { Component, OnInit } from '@angular/core';
import { GroupService } from "../../services/group.service";
import { Group } from "../../shared/group";

@Component({
    moduleId: module.id,
    selector: 'group-list',
    template: `
    <div>
        <table border="1">
            <tr>
                <td>Omschrijving</td>
                <td>Gebruikers</td>
                <td>Permissies</td>
            </tr>
            <tr *ngFor="let record of records">
                <td>{{record.description}}</td>
                <td>{{record.userCount}}</td>
                <td>{{record.permissionCount}}</td>
            </tr>
        </table>
    </div>
    `
})
export class GroupListComponent implements OnInit {
    public records:Group[] = [];

    constructor(private service:GroupService) { }

    ngOnInit() {
        this.loadData();
    }

    private loadData(){
        this.service.getAll()
            .then((groups:Group[]) => this.records = groups);
    }
}