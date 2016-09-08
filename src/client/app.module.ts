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

@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule, routing ],
    declarations: [ LoginComponent, AppComponent, TodoListComponent, TodoDetailComponent, DashboardComponent],
    providers: [ConfigurationProvider,TodoService,AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
