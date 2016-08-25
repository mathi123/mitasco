import { TodoListComponent } from "./components/todo/todo-list.component";
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { Routes, RouterModule,Route } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const appRoutes: Routes = [
    { path: '', component: DashboardComponent},
    { path: 'todo-list', component: TodoListComponent },
    { path: 'todo/:id', component: TodoDetailComponent }
];
export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);