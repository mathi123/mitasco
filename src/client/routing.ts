import { TodoListComponent } from "./components/todo/todo-list.component";
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GroupListComponent } from "./components/group/group-list.component";
import { GroupDetailComponent } from "./components/group/group-detail.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { LoginComponent } from "./components/login/login.component";

const appRoutes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'login', component: LoginComponent},
    { path: 'todo-list', component: TodoListComponent },
    { path: 'todo/:id', component: TodoDetailComponent },
    { path: 'group-list', component: GroupListComponent },
    { path: 'group-detail/:id', component: GroupDetailComponent},
    { path: '**', component: PageNotFoundComponent }
];
export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);