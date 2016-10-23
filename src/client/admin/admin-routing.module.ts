import { Routes, RouterModule } from "@angular/router";
import { LanguageListComponent } from "./language/language-list.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { GroupDetailComponent } from "./group/group-detail.component";
import { GroupListComponent } from "./group/group-list.component";
import { PermissionCodeListComponent } from "./permission-code/permission-code-list.component";
import { UserListComponent } from "./user/user-list.component";

const routes: Routes = [
    {
        path: 'admin',
        children: [
            {path: 'group-detail', component: GroupDetailComponent},
            {path: 'group-list', component: GroupListComponent},
            {path: 'language-list', component: LanguageListComponent},
            {path: 'permission-code-list', component: PermissionCodeListComponent},
            {path: 'user-list', component: UserListComponent},
            {path: '**', component: DashboardComponent}]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule {
}