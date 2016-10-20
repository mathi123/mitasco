import { TodoListComponent } from "./components/todo/todo-list.component";
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GroupListComponent } from "./components/group/group-list.component";
import { GroupDetailComponent } from "./components/group/group-detail.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { LoginComponent } from "./components/login/login.component";
import { PermissionCodeListComponent } from "./components/permission-code/permission-code-list.component";
import { UserListComponent } from "./components/user/user-list.component";
import { RegisterComponent } from "./components/register/register.component";
import { LanguageListComponent } from "./components/language/language-list.component";

const appRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'todo-list', component: TodoListComponent},
    {path: 'todo/:id', component: TodoDetailComponent},
    {path: 'group-list', component: GroupListComponent},
    {path: 'group-detail/:id', component: GroupDetailComponent},
    {path: 'permission-code-list', component: PermissionCodeListComponent},
    {path: 'language-list', component: LanguageListComponent},
    {path: 'user-list', component: UserListComponent},
    {path: '**', component: PageNotFoundComponent}
];
export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);