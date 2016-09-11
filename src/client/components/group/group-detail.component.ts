import { Component, OnInit, Input } from '@angular/core';
import { Group } from "../../shared/group";
import { GroupService } from "../../services/group.service";

@Component({
    moduleId: module.id,
    selector: 'group-detail',
    template:
    `
    <div>
        <p>{{record.description}}</p>
        <p>Gebruikers</p>
        <table border="1">
            <tr>
                <td>Naam</td>
            </tr>
            <tr *ngFor="let user of record.users">
                <td>{{user.value}}</td>
            </tr>
        </table>
        <p>Permissies</p>
        <table border="1">
            <tr>
                <td>Naam</td>
            </tr>
            <tr *ngFor="let user of record.users">
                <td>{{user.value}}</td>
            </tr>
        </table>
    </div>
    `
})
export class GroupDetailComponent implements OnInit {
    @Input()
    public record:Group;

    constructor(private service:GroupService) { }

    ngOnInit() {

    }

    private loadData(){

    }
}