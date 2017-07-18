import { Component, OnInit } from '@angular/core';
import { EventService, IEvent, ISession } from '../shared/index';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'event-details',
    moduleId: module.id,
    templateUrl: './event-details.html',
    styles: [`
        .container { padding-left:20px;
                     padding-right:20px; }
        .event-image { height: 100px; }
        a { cursor:pointer; }
    `]
})
export class EventDetailsComponent implements OnInit {
    event: IEvent;
    id: number;
    addMode: boolean = false;
    filterBy: string = 'all';
    sortBy: string = 'name';
    ascending: boolean = true;

    constructor(private eventService: EventService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.forEach((data) => {
            this.event = data['event'];
            this.addMode = false;
        })
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: ISession) {
        session.id = Math.max.apply(null, this.event.sessions.map(s => s.id)) + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    cancelAddMode() {
        this.addMode = false;
    }

    sortByName() {
        this.sortBy === 'name' ? this.ascending = !this.ascending : this.ascending = true;
        this.sortBy = 'name';
    }

    sortByVotes() {
        this.sortBy === 'votes' ? this.ascending = !this.ascending : this.ascending = false;
        this.sortBy = 'votes';
    }
}
