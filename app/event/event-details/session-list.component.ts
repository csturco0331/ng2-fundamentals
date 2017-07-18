import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/index';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

@Component({
    selector: 'session-list',
    moduleId: module.id,
    templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[];
    filteredSessions: ISession[] = [];
    @Input() filterBy: string = 'all';
    @Input() sortBy: string = 'name';
    @Input() ascending: boolean = true;
    @Input() eventId: number;

    constructor(private authService: AuthService, private voterService: VoterService) { }

    ngOnChanges() {
        if(this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortBy === 'name'
                ? this.ascending === true
                    ? this.filteredSessions.sort(sortByNameAsc)
                    : this.filteredSessions.sort(sortByNameDesc)
                : this.ascending === true
                    ? this.filteredSessions.sort(sortByVotesAsc)
                    : this.filteredSessions.sort(sortByVotesDesc);
        }
    }

    filterSessions(filter) {
        if (filter === 'all') this.filteredSessions = this.sessions.slice(0);
        else this.filteredSessions = this.sessions.filter(session => session.level.toLocaleLowerCase() === filter);
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser.userName);
        else this.voterService.addVoter(this.eventId, session, this.authService.currentUser.userName);
        if (this.sortBy === 'votes') {
            this.ascending
                ?   this.filteredSessions.sort(sortByVotesAsc)
                :   this.filteredSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
    }

}

function sortByNameAsc(s1: ISession, s2: ISession) {
    return (s1.name === s2.name)
        ? 0
        : (s1.name > s2.name)
            ? 1
            : -1;
}

function sortByNameDesc(s1: ISession, s2: ISession) {
    return (s1.name === s2.name)
        ? 0
        : (s1.name < s2.name)
            ? 1
            : -1;
}

function sortByVotesAsc(s1: ISession, s2: ISession) {
    return s1.voters.length - s2.voters.length;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}
