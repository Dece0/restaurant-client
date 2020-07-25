import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/user';
import { TokenResponse, Token } from '../../token';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly api = `http://localhost:3000`;

    private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
        null
    );
    private tokenSubject: BehaviorSubject<Token> = new BehaviorSubject<Token>(
        null
    );
    public user: Observable<User>;

    constructor(
        private http: HttpClient,
        private jwtHelperService: JwtHelperService
    ) {
        const info = JSON.parse(localStorage.getItem('info'));
        if (info !== null) {
            this.userSubject.next(info.user);
            this.tokenSubject.next(info.token);
        }

        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public get token(): Token {
        return this.tokenSubject.value;
    }

    public isAuthenticated(): boolean {
        return (this.tokenSubject.value === null)
            ? false
            : !this.jwtHelperService.isTokenExpired(
                  this.tokenSubject.value.value
              );
    }

    public login(email: string, password: string): Observable<TokenResponse> {
        return this.http
            .post<TokenResponse>(`${this.api}/auth/login`, {
                email,
                password,
            })
            .pipe(
                map((token: TokenResponse) => {
                    this.setSession(token);
                    return token;
                })
            );
    }

    public logout() {
        localStorage.removeItem('info');
        this.userSubject.next(null);
        this.tokenSubject.next(null);
    }

    private setSession({ accessToken }) {
        const decodedToken = this.jwtHelperService.decodeToken(accessToken);
        localStorage.setItem(
            'info',
            JSON.stringify({
                user: {
                    email: decodedToken.email,
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                },
                token: {
                    exp: decodedToken.exp,
                    value: accessToken,
                },
            })
        );
        this.userSubject.next({
            email: decodedToken.email,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
        });
        this.tokenSubject.next({
            exp: decodedToken.exp,
            value: accessToken
        });
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
