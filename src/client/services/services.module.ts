import { NgModule } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { CountryService } from "./country.service";
import { GroupService } from "./group.service";
import { LanguageService } from "./language.service";
import { PermissionCodeService } from "./permission-code.service";
import { UrlTrackingService } from "./url-tracking.service";
import { TodoService } from "./todo.service";
import { UserService } from "./user.service";
import { ConfigurationService } from "./configuration.service";
import { MenuService } from "./menu.service";

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [AuthenticationService, ConfigurationService, CountryService, GroupService, LanguageService, MenuService,
                PermissionCodeService, TodoService, UrlTrackingService, UserService]
        }
    }
}