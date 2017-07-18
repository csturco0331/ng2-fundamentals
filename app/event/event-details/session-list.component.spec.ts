import { SessionListComponent, ISession } from '../index';

describe('SessionListComponent', () => {
    let component: SessionListComponent;
    let mockAuthService, mockVoterService;

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    })

    describe('ngOnChanges', () => {

        it('should filter the sessions by intermediate', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'intermediate'},
                {name: 'session 3', level: 'beginner'},
            ];
            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.ascending = true;
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.filteredSessions.length).toBe(2);
        })

        it('should sort by name ascending', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 3', level: 'intermediate'},
                {name: 'session 2', level: 'beginner'},
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.ascending = true;
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.filteredSessions[2].name).toBe('session 3');
        })

        it('should sort by name descending', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'intermediate'},
                {name: 'session 3', level: 'beginner'},
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.ascending = false;
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.filteredSessions[0].name).toBe('session 3');
        })

        it('should sort by votes ascending', () => {
            component.sessions = <ISession[]>[
                {voters: ['john','james'], name: 'session 1', level: 'intermediate'},
                {voters: [], name: 'session 2', level: 'beginner'},
                {voters: ['john'], name: 'session 3', level: 'intermediate'},
            ];
            component.filterBy = 'all';
            component.sortBy = 'votes';
            component.ascending = true;
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.filteredSessions[0].name).toBe('session 2');
        })

        it('should sort by votes descending', () => {
            component.sessions = <ISession[]>[
                {voters: [], name: 'session 1', level: 'intermediate'},
                {voters: ['john','james'], name: 'session 2', level: 'beginner'},
                {voters: ['john'], name: 'session 3', level: 'intermediate'},
            ];
            component.filterBy = 'all';
            component.sortBy = 'votes';
            component.ascending = false;
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.filteredSessions[0].name).toBe('session 2');
        })
    })
})
