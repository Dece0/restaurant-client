import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getProfile(): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users/profile`);
    }
}
