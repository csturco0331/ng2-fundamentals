import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent, EventService } from './shared/index';

@Component({
    template: `
        <div>
            <h1>{{pageTitle}}</h1>
            <hr/>
            <div class="row">
                <div class="col-md-6" *ngFor="let event of events">
                    <event-thumbnail [event]="event"></event-thumbnail>
                </div>
            </div>
        </div>
    `
})
export class EventListComponent implements OnInit{

    pageTitle: String = 'Events List';
    events: IEvent[];

    constructor(private eventService: EventService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }

}
