import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ApplicationRootComponent } from "./components/application-root/application-root.component";
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { TodoListComponent } from "./components/todo/todo-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RegisterComponent } from "./components/register/register.component";
import { ServicesModule } from "./services/services.module";
import { AppRoutingModule } from "./app-routing.module";
import { AdminModule } from "./admin/admin.module";
import { WidgetModule } from "./widgets/widget.module";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ServicesModule, WidgetModule, AdminModule, AppRoutingModule],
    declarations: [LoginComponent, RegisterComponent, ApplicationRootComponent, MenuComponent, TodoListComponent, TodoDetailComponent,
        DashboardComponent, PageNotFoundComponent],
    bootstrap: [ApplicationRootComponent]
})
export class AppModule {
}
