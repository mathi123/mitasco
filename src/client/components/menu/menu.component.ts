import { Component, OnInit } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { ConfigurationService } from "../../server-api/configuration.service";
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
    public isOpen: boolean;
    private docsUrl: string;
    private groups: MenuGroup[];

    constructor(private menuService: MenuService, configuration: ConfigurationService, private userSettings: UserSettingsService) {
        this.docsUrl = configuration.getDocumentationUrl();
    }

    ngOnInit(): void {
        this.userSettings.userSettingsChanged
            .subscribe(() => {
                this.rebuildMenu();
            });

        this.menuService.menuToggled
            .subscribe(() => {
                this.isOpen = this.menuService.isOpen;
            });
    }

    private rebuildMenu() {
        this.groups = [];

        let generalMenu = new MenuGroup();

        generalMenu.description = "Algemeen";
        generalMenu.add(new MenuItem("Todo's", "/todo-list", true, null, null));

        this.groups.push(generalMenu);

        if (this.userSettings.getPermissions().indexOf(PermissionCodes.Admin) >= 0) {
            let adminMenu = new MenuGroup();
            adminMenu.description = "Admin";

            adminMenu.add(new MenuItem("Groepen", "/admin/group-list", true, null, null));
            adminMenu.add(new MenuItem("Gebruikers", "/admin/user-list", true, null, null));
            adminMenu.add(new MenuItem("Permissies", "/admin/permission-code-list", true, null, null));
            adminMenu.add(new MenuItem("Talen", "/admin/language-list", true, null, null));
            adminMenu.add(new MenuItem("API docs", null, false, "_blank", this.docsUrl));

            this.groups.push(adminMenu);
        }
    }
}