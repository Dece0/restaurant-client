import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SelectedRestaurant } from '../../restaurant';
import {
    faMapMarkerAlt,
    faQuoteLeft,
    faQuoteRight,
    faUser,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/user';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
    // icons
    faMapMarkerAlt = faMapMarkerAlt;
    faQuoteLeft = faQuoteLeft;
    faQuoteRight = faQuoteRight;
    faUser = faUser;
    faStar = faStar;
    // data
    private subs = new Subscription();
    restaurant: BehaviorSubject<SelectedRestaurant> = new BehaviorSubject<
        SelectedRestaurant
    >(null);
    user: User;

    constructor(
        private restaurantService: RestaurantService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getCurrentRestaurant();
        this.getCurrentUser();
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    getCurrentRestaurant(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.subs.add(
            this.restaurantService
                .getRestaurant(id)
                .subscribe((restaurant) => this.restaurant.next(restaurant))
        );
    }

    getCurrentUser(): void {
        this.subs.add(
            this.authService.user.subscribe((user) => (this.user = user))
        );
    }

    isUserLoggedIn(): boolean {
        return this.authService.isAuthenticated();
    }

    wroteReview() {
        if (!this.restaurant.value && !this.user) return false;
        return this.restaurant.value.reviews.find(
            (review) => review.author.email === this.user.email
        )
            ? true
            : false;
    }

    getAverageRating(): string | number {
        if (!this.restaurant || !this.restaurant.value.reviews.length)
            return 'Nehodnotené';
        const average =
            this.restaurant.value.reviews.reduce(
                (total, next) => total + next.rating,
                0
            ) / this.restaurant.value.reviews.length;
        return Math.round(average * 10) / 10;
    }

    goBack(): void {
        this.location.back();
    }
}
