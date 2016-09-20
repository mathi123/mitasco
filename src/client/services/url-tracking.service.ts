import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Injectable()
export class UrlTrackingService {

    public originalUrl: string;

    constructor(private router: Router) {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((val) => {
                this.originalUrl = val.url;
            });
    }
}