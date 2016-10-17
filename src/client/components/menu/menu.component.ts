import { Component } from "@angular/core";
import { MenuProvider } from "../../providers/menu.provider";
import { ConfigurationProvider } from "../../providers/configuration.provider";

@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {
    public isOpen: boolean = true;
    public docsUrl: string;

    constructor(private menu: MenuProvider, private configuration: ConfigurationProvider) {
        this.docsUrl = configuration.getDocumentationUrl();

        menu.menuToggled.asObservable().subscribe((isOpen: boolean) => {
            this.isOpen = isOpen;
            console.log(isOpen);
        }, err => {
            console.error(err)
        });
    }
}