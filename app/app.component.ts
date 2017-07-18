import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
    selector: 'ev-app',
    moduleId: module.id,
    template:`
        <nav-bar></nav-bar>
        <router-outlet></router-outlet>
    `,
})
export class AppComponent implements OnInit{

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.authService.checkAuthenticationStatus();
    }
}
