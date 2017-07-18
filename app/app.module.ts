import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Error404Component } from './errors/404.component';
import { NavComponent } from './nav/navbar.component';

import { AuthService } from './user/index';

import {
    CollapsibleWellComponent,
    JQ_TOKEN,
    ModalTriggerDirective,
    SimpleModalComponent,
    TOASTR_TOKEN,
    Toastr
} from './common/index';

import {
    CreateEventComponent,
    CreateSessionComponent,
    DurationPipe,
    EventDetailsComponent,
    // EventRouteActivator,
    EventListComponent,
    EventListResolver,
    EventResolver,
    EventService,
    EventThumbnailComponent,
    LocationValidatorDirective,
    SessionListComponent,
    UpvoteComponent,
    VoterService
 } from './event/index';

const appRoutes: Routes = [
    { path: 'events', component: EventListComponent, resolve: {events: EventListResolver} },
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateEvent'] },
    { path: 'events/:id', component: EventDetailsComponent, /*canActivate: [EventRouteActivator]*/ resolve: {event: EventResolver} },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full'},
    { path: 'user', loadChildren: 'app/user/user.module#UserModule'}
];

declare let toastr: Toastr;
declare let jQuery: Object;

function checkDirtyState(component: CreateEventComponent) {
    return (component.isDirty)
        ? window.confirm('You have not saved this event, do you really want to cancel?')
        : true
}

@NgModule({
    imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            ReactiveFormsModule,
            RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        CollapsibleWellComponent,
        CreateEventComponent,
        CreateSessionComponent,
        DurationPipe,
        Error404Component,
        EventDetailsComponent,
        EventListComponent,
        EventThumbnailComponent,
        LocationValidatorDirective,
        ModalTriggerDirective,
        NavComponent,
        SessionListComponent,
        SimpleModalComponent,
        UpvoteComponent
    ],
    providers: [
        AuthService,
        EventListResolver,
        EventResolver,
        // EventRouteActivator,
        EventService,
        VoterService,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        { provide: 'canDeactivateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
