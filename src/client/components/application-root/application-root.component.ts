import { Component, OnInit } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { UrlTrackingService } from "../../services/url-tracking.service";

@Component({
    moduleId: module.id,
    selector: 'application-root',
    templateUrl: 'application-root.component.html'
})
export class ApplicationRootComponent implements OnInit {
    public menuIsOpen: boolean = false;

    constructor(private menu: MenuService, private urlTrackingService: UrlTrackingService) {
    }

    ngOnInit(): void {
        this.menu.menuToggled.subscribe(() => {
            this.menuIsOpen = this.menu.isOpen;
        });
    }

    public toggleMenu() {
        this.menu.toggle();
    }
}