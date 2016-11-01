import { Injectable, Injector, ViewContainerRef, Compiler, ComponentRef, ReflectiveInjector } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class ModalService {
    private viewContainerRef: ViewContainerRef;
    private injector: Injector;
    public activeModals: number = 0;

    constructor(private compiler: Compiler) {
    }

    registerViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    registerInjector(injector: Injector) {
        this.injector = injector;
    }

    create<T>(module: any, component: any, parameters?: Object): Observable<ComponentRef<T>> {
        // we return a stream so we can  access the componentref
        let componentRefObservable = new ReplaySubject<ComponentRef<T>>();
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
                    .resolveAndCreate([], this.injector);
                // create the actual component
                let componentRef = this.viewContainerRef
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
                componentRefObservable.next(componentRef);
                componentRefObservable.complete();
            });
        return componentRefObservable;
    }
}