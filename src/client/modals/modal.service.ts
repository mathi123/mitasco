import { Injectable, Compiler, ComponentRef, ReflectiveInjector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Placeholder } from "./modal-placeholder/placeholder";

@Injectable()
export class ModalService {
    private placeholders: any = {};
    public activeModals: number = 0;

    constructor(private compiler: Compiler) {
    }

    registerPlaceholder(placeholder: Placeholder) {
        this.placeholders[placeholder.id] = placeholder;
    }

    create<T>(placeholderId: string, module: any, component: any, parameters?: Object): Observable<ComponentRef<T>> {
        let placeholder = this.placeholders[placeholderId];

        if (placeholder === undefined) {
            console.error("placeholder not found");
            return;
        }

        if (placeholder.stackModals) {
            // TODO
        } else {
            return this.createFromPlaceholder<T>(placeholder, module, component, parameters);
        }
    }

    createFromPlaceholder<T>(placeholder: Placeholder, module: any, component: any, parameters?: Object): Observable<ComponentRef<T>> {
        // we return a stream so we can  access the componentref
        let componentRef$ = new ReplaySubject<ComponentRef<T>>();
        // compile the component based on its type and
        // create a component factory
        this.compiler.compileModuleAndAllComponentsAsync(module)
            .then(factory => {
                // look for the componentfactory in the modulefactory
                let componentFactory = factory.componentFactories
                    .filter(item => item.componentType === component)[0];
                // the injector will be needed for DI in
                // the custom component
                const childInjector = ReflectiveInjector
                    .resolveAndCreate([], placeholder.injector);
                // create the actual component
                let componentRef = placeholder.viewContainerRef
                    .createComponent(componentFactory, 0, childInjector);
                // pass the @Input parameters to the instance
                Object.assign(componentRef.instance, parameters);
                this.activeModals++;
                // add a destroy method to the modal instance
                componentRef.instance["destroy"] = () => {
                    this.activeModals--;
                    // this will destroy the component
                    componentRef.destroy();
                };
                // the component is rendered into the ViewContainerRef
                // so we can update and complete the stream
                componentRef$.next(componentRef);
                componentRef$.complete();
            });
        return componentRef$;
    }
}