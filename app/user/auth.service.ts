import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {
    currentUser: IUser;
    private options = new RequestOptions({headers: new Headers({ 'Content-type':'application/json'})});

    constructor(private http: Http) { }

    loginUser(userName: string, password: string) {
        let loginInfo = { username: userName, password: password };
        return this.http.post('/api/login', loginInfo, this.options)
            .do((response: Response) => {if (response) this.currentUser = <IUser>response.json().user})
            .catch(error => Observable.of(false));
    }

    isAuthenticated(): boolean {
        return !!this.currentUser
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentIdentity')
            .map((response: any) => response._body ? response.json() : {})
            .do(currentUser => !!currentUser.userName ? this.currentUser = currentUser : this.currentUser = null)
            .subscribe();
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, this.options);
    }

    logout() {
        this.currentUser = undefined;
        return this.http.post('/api/logout', {}, this.options);
    }
}
