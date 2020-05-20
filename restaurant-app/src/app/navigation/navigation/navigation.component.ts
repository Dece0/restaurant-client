import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [
                animate(250)
            ]),
            transition('* => void', [
                animate(250)
            ])
        ]),
        trigger('openClose', [
            state('void', style({ left: '-300px' })),
            transition('void => *', [
                animate(250)
            ]),
            transition('* => void', [
                animate(250)
            ])
        ])
    ]
})
export class NavigationComponent implements OnInit {
    faHome = faHome;
    faSignInAlt = faSignInAlt;
    faSignOutAlt = faSignOutAlt;
    faUser = faUser;
    faUtensils = faUtensils;
    faBars = faBars;
    isSideNavOpen = false;

    constructor() {}

    ngOnInit(): void {}
}
