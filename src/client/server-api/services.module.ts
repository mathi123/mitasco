import { NgModule } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { CountryService } from "./country.service";
import { GroupService } from "./group.service";
import { LanguageService } from "./language.service";
import { PermissionCodeService } from "./permission-code.service";
import { TodoService } from "./todo.service";
import { UserService } from "./user.service";
import { ConfigurationService } from "./configuration.service";

@NgModule({
    providers: [AuthenticationService, ConfigurationService, CountryService, GroupService, LanguageService,
        PermissionCodeService, TodoService, UserService]
})
export class ServicesModule {

}