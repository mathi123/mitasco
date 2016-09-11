import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './components/app/app.component';
import { routing } from './routing';
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

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule, routing ],
    declarations: [ LoginComponent, AppComponent, TodoListComponent, TodoDetailComponent, DashboardComponent, GroupListComponent,GroupDetailComponent],
    providers: [ConfigurationProvider, TodoService, AuthenticationService, GroupService],
    bootstrap: [AppComponent]
})
export class AppModule { }
