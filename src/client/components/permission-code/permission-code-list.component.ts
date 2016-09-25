import { Component, OnInit } from '@angular/core';
import { PermissionCodeService } from "../../services/permission-code.service";
import { PermissionCode } from "../../shared/permission-code";
import { ConfigurationProvider } from "../../providers/configuration.provider";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'permission-code-list',
    templateUrl: 'permission-code-list.component.html'
})
export class PermissionCodeListComponent implements OnInit {
    private records: PermissionCode[];

    constructor(private service:PermissionCodeService, private configuration:ConfigurationProvider, private router:Router) {

    }

    ngOnInit() {
        if(!this.configuration.isLoggedIn()){
            this.router.navigate(['/login']);
            return;
        }else{
            this.loadData();
        }
    }

    private loadData(){
        this.service.getAll()
            .then((data:PermissionCode[]) => this.records = data)
            .catch((err) => console.log(err));
    }

}