import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { AppComponent }  from './components/app/app.component';
import { routing } from './routing';
import { TodoDetailComponent } from "./components/todo/todo-detail.component";
import { TodoListComponent } from "./components/todo/todo-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
    declarations: [ AppComponent, TodoListComponent,TodoDetailComponent,DashboardComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
