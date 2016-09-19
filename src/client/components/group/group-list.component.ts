import { Component, OnInit } from '@angular/core';
import { GroupService } from "../../services/group.service";
import { Group } from "../../shared/group";
import { Router } from "@angular/router";
import { ConfigurationProvider } from "../../providers/configuration.provider";

@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: 'group-list.template.html'
})
export class GroupListComponent implements OnInit {
    public records:Group[] = [];

    constructor(private service:GroupService, private router: Router,
                private configuration: ConfigurationProvider) { }

    ngOnInit() {
        if(!this.configuration.isLoggedIn()){
            this.router.navigate(['/login']);
            return;
        }
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