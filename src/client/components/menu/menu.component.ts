import { Component } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { ConfigurationService } from "../../services/configuration.service";

@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {
    public isOpen: boolean = false;
    public docsUrl: string;

    constructor(private menu: MenuService, private configuration: ConfigurationService) {
        this.docsUrl = configuration.getDocumentationUrl();

        menu.menuToggled.asObservable().subscribe((isOpen: boolean) => {
            this.isOpen = isOpen;
        }, err => {
            console.error(err)
        });
    }
}