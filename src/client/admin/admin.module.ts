import { LanguageListComponent } from "./language/language-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GroupListComponent } from "./group/group-list.component";
import { GroupDetailComponent } from "./group/group-detail.component";
import { PermissionCodeListComponent } from "./permission-code/permission-code-list.component";
import { UserListComponent } from "./user/user-list.component";

@NgModule({
    imports: [CommonModule, AdminRoutingModule],
    declarations: [DashboardComponent, GroupListComponent, GroupDetailComponent, LanguageListComponent, PermissionCodeListComponent, UserListComponent],
    exports: [CommonModule, RouterModule]
})
export class AdminModule {

}