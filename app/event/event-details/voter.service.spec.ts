import { VoterService, ISession } from '../index';
import { Observable } from 'rxjs/Rx';

describe('VoterService', () => {

    let voterService: VoterService,
        mockHttp;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    })

    describe('deleteVoter', () => {
        it('should remove a voter from the list of voters', () => {
            var session = { id: 6, voters: ["joe", "john"]};
            mockHttp.delete.and.returnValue(Observable.of(true));

            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        })

        it('should call http.delete with the right URL', () => {
            var session = { id: 6, voters: ["joe", "john"]};
            mockHttp.delete.and.returnValue(Observable.of(true));

            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe');
        })
    })

    describe('addVoter', () => {
        it('should add a voter to the list of voters', () => {
            var session = { id: 6, voters: ["john"]};
            mockHttp.post.and.returnValue(Observable.of(true));

            voterService.addVoter(3, <ISession>session, "joe");

            expect(session.voters.length).toBe(2);
            expect(session.voters[1]).toBe("joe");
        })

        it('should call http.post with the right URL', () => {
            var session = { id: 6, voters: ["john"]};
            mockHttp.post.and.returnValue(Observable.of(true));

            voterService.addVoter(3, <ISession>session, "joe");

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object));
        })
    })

    describe('userHasVoted', () => {
        it('should return true', () => {
            var session = { id: 6, voters: ["joe", "john", "smith"]};
            var voterName = "john";

            expect(voterService.userHasVoted(<ISession>session, voterName)).toBe(true);
        })

        it('should return false', () => {
            var session = { id: 6, voters: ["joe", "john", "smith"]};
            var voterName = "jake";

            expect(voterService.userHasVoted(<ISession>session, voterName)).toBe(false);
        })
    })
})
