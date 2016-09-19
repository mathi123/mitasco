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

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule, routing ],
    declarations: [ LoginComponent, ApplicationRootComponent, MenuComponent, TodoListComponent, TodoDetailComponent, DashboardComponent, GroupListComponent,GroupDetailComponent,AccordionComponent,AccordionGroupComponent,PageNotFoundComponent],
    providers: [ConfigurationProvider, TodoService, AuthenticationService, GroupService, appRoutingProviders, MenuProvider],
    bootstrap: [ApplicationRootComponent]
})
export class AppModule { }
