import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../user';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    user: User;
    token: Token;

    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const isAuthenticated = this.authService.isAuthenticated();
        const currentUser = this.authService.userValue;
        if (!isAuthenticated && !currentUser) return next.handle(request);
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.token.value}`
            }
        });
        return next.handle(request);
    }
}
