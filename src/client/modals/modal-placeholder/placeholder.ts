import { ViewContainerRef, Injector } from "@angular/core";

export class Placeholder {
    public id: string;
    public viewContainerRef: ViewContainerRef;
    public stackModals: boolean;
    public injector: Injector;
}