import { TodoListComponent } from "./components/todo/todo-list.component";
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { GroupListComponent } from "./components/group/group-list.component";
import { GroupDetailComponent } from "./components/group/group-detail.component";

const appRoutes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'todo-list', component: TodoListComponent },
    { path: 'todo/:id', component: TodoDetailComponent },
    { path: 'group-list', component: GroupListComponent },
    { path: 'group-detail/:id', component: GroupDetailComponent}
];
export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);