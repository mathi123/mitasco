import { Component, OnInit } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { ConfigurationService } from "../../services/configuration.service";
import { UserSettingsService } from "../../services/user-settings.service";
import { MenuGroup } from "./menu-group";
import { MenuItem } from "./menu-item";
import { PermissionCodes } from "../../shared/permissions-codes";

@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {
    public isOpen: boolean = false;
    public docsUrl: string;
    private groups: MenuGroup[];

    constructor(private menu: MenuService, private configuration: ConfigurationService, private userSettings: UserSettingsService) {
        this.docsUrl = configuration.getDocumentationUrl();

        menu.menuToggled.asObservable().subscribe((isOpen: boolean) => {
            this.isOpen = isOpen;
        }, err => {
            console.error(err)
        });
    }

    ngOnInit(): void {
        this.userSettings.userSettingsChanged
            .subscribe(() => {
                this.rebuildMenu();
            });
    }

    private rebuildMenu() {
        console.debug("rebuilding menu");
        this.groups = [];

        let generalMenu = new MenuGroup();

        generalMenu.description = "Algemeen";
        generalMenu.add(new MenuItem("Todo's", "/todo-list"));

        this.groups.push(generalMenu);

        if (this.userSettings.getPermissions().indexOf(PermissionCodes.Admin) >= 0) {
            let adminMenu = new MenuGroup();
            adminMenu.description = "Admin";

            adminMenu.add(new MenuItem("Groepen", "/admin/group-list"));
            adminMenu.add(new MenuItem("Gebruikers", "/admin/user-list"));
            adminMenu.add(new MenuItem("Permissies", "/admin/permission-code-list"));
            adminMenu.add(new MenuItem("Talen", "/admin/language-list"));

            this.groups.push(adminMenu);
        }
    }
}