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
import { ServicesModule } from "./server-api/services.module";
import { AppRoutingModule } from "./app-routing.module";
import { AdminModule } from "./admin/admin.module";
import { WidgetModule } from "./widgets/widget.module";
import { ModalsModule } from "./modals/modals.module";
import { UrlTrackingService } from "./services/url-tracking.service";
import { MenuService } from "./services/menu.service";
import { UserSettingsService } from "./services/user-settings.service";
import { SalesModule } from "./sales/sales.module";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ServicesModule, WidgetModule, ModalsModule, AdminModule, SalesModule, AppRoutingModule],
    providers: [UrlTrackingService, MenuService, UserSettingsService],
    declarations: [LoginComponent, RegisterComponent, ApplicationRootComponent, MenuComponent, TodoListComponent, TodoDetailComponent,
        DashboardComponent, PageNotFoundComponent],
    bootstrap: [ApplicationRootComponent]
})
export class AppModule {
}
