import { Component, OnInit } from "@angular/core";
import { LanguageService } from "../../server-api/language.service";
import { Language } from "../../shared/language";
import { ConfigurationService } from "../../server-api/configuration.service";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'language-list',
    templateUrl: 'language-list.component.html'
})
export class LanguageListComponent implements OnInit {
    private records: Language[];

    constructor(private service: LanguageService, private configuration: ConfigurationService, private router: Router) {
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
        this.service.getAll()
            .then((data: Language[]) => this.records = data)
            .catch((err) => console.log(err));
    }
}