import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ApplicationRootComponent } from "./components/application-root/application-root.component";
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { TodoListComponent } from "./components/todo/todo-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { GroupListComponent } from "./components/group/group-list.component";
import { GroupDetailComponent } from "./components/group/group-detail.component";
import { AccordionComponent } from "./components/accordion/accordion.component";
import { AccordionGroupComponent } from "./components/accordion/accordion-group.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MenuComponent } from "./components/menu/menu.component";
import { SuggestionInputComponent } from "./components/suggestion-input/suggestion-input.component";
import { PermissionCodeListComponent } from "./components/permission-code/permission-code-list.component";
import { UserListComponent } from "./components/user/user-list.component";
import { RegisterComponent } from "./components/register/register.component";
import { ServicesModule } from "./services/services.module";
import { AppRoutingModule } from "./app-routing.module";
import { AdminModule } from "./admin/admin.module";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ServicesModule.forRoot(), AdminModule, AppRoutingModule],
    declarations: [LoginComponent, RegisterComponent, ApplicationRootComponent, MenuComponent, TodoListComponent, TodoDetailComponent,
        DashboardComponent, GroupListComponent, GroupDetailComponent, AccordionComponent, AccordionGroupComponent,
        PageNotFoundComponent, SuggestionInputComponent, PermissionCodeListComponent, UserListComponent],
    bootstrap: [ApplicationRootComponent]
})
export class AppModule {
}
