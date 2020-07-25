import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    faHome,
    faSignInAlt,
    faSignOutAlt,
    faUser,
    faUtensils,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/user';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [animate(250)]),
            transition('* => void', [animate(250)]),
        ]),
        trigger('openClose', [
            state('void', style({ left: '-300px' })),
            transition('void => *', [animate(250)]),
            transition('* => void', [animate(250)]),
        ]),
    ],
})
export class NavigationComponent implements OnInit, OnDestroy {
    // icons
    faHome = faHome;
    faSignInAlt = faSignInAlt;
    faSignOutAlt = faSignOutAlt;
    faUser = faUser;
    faUtensils = faUtensils;
    faBars = faBars;
    isSideNavOpen = false;
    // data
    user: User;
    private subs = new Subscription();

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.getUser();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    getUser(): void {
        this.subs.add(this.authService.user.subscribe(
            user => this.user = user
        ));
    }

    isUserLoggedIn(): boolean {
        return this.authService.isAuthenticated();
    }
}
