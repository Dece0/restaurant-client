import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    private subs: Subscription = new Subscription();
    user: User;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.getProfile();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    getProfile() {
        this.subs.add(
            this.userService
                .getProfile()
                .subscribe((user) => (this.user = user))
        );
    }
}
