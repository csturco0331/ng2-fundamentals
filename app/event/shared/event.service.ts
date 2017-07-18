import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IEvent, ISession } from './index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class EventService {

    constructor(private http: Http) { }

    getEvents(): Observable<IEvent[]> {
        return this.http.get("/api/events")
            .map((response: Response) => <IEvent[]>response.json())
            .catch(this.handleError);
    }

    getEvent(id: number): Observable<IEvent> {
        return this.http.get("/api/events/" + id)
            .map((response: Response) => <IEvent>response.json())
            .catch(this.handleError);
    }

    saveEvent(event): Observable<IEvent> {
        let headers = new Headers({ 'Content-type':'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('/api/events', event, options)
            .map((response: Response) => <IEvent>response.json())
            .catch(this.handleError);
    }

    searchSessions(searchTerm: string) {
        return this.http.get("/api/sessions/search?search=" + searchTerm)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
