import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { ApplicationRootComponent }  from './components/application-root/application-root.component';
import { routing, appRoutingProviders } from './routing';
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { TodoListComponent } from "./components/todo/todo-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { TodoService } from "./services/todo.service";
import { ConfigurationProvider } from "./providers/configuration.provider";
import { AuthenticationService } from "./services/authentication.service";
import { LoginComponent } from "./components/login/login.component";
import { GroupService } from "./services/group.service";
import { GroupListComponent } from "./components/group/group-list.component";
import { GroupDetailComponent } from "./components/group/group-detail.component";
import { AccordionComponent } from "./components/accordion/accordion.component";
import { AccordionGroupComponent } from "./components/accordion/accordion-group.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MenuProvider } from "./providers/menu.provider";
import { MenuComponent } from "./components/menu/menu.component";
import { UrlTrackingService } from "./services/url-tracking.service";
import { SuggestionInputComponent } from "./components/suggestion-input/suggestion-input.component";
import { UserService } from "./services/user.service";
import { PermissionCodeService } from "./services/permission-code.service";
import { PermissionCodeListComponent } from "./components/permission-code/permission-code-list.component";
import { UserListComponent } from "./components/user/user-list.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule, routing ],
    declarations: [ LoginComponent, RegisterComponent, ApplicationRootComponent, MenuComponent, TodoListComponent, TodoDetailComponent,
        DashboardComponent, GroupListComponent,GroupDetailComponent,AccordionComponent,AccordionGroupComponent,
        PageNotFoundComponent, SuggestionInputComponent, PermissionCodeListComponent, UserListComponent],
    providers: [TodoService,GroupService, appRoutingProviders, ConfigurationProvider,
        AuthenticationService, MenuProvider,UrlTrackingService, UserService, PermissionCodeService],
    bootstrap: [ApplicationRootComponent]
})
export class AppModule { }
