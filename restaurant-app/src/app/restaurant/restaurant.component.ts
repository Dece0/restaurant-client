import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SelectedRestaurant } from '../restaurant';
import { ReviewService } from '../review.service';
import { Review } from '../review';
import { faMapMarkerAlt, faQuoteLeft, faQuoteRight, faUser, faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
    restaurant: SelectedRestaurant;
    faMapMarkerAlt = faMapMarkerAlt;
    faQuoteLeft = faQuoteLeft;
    faQuoteRight = faQuoteRight;
    faUser = faUser;
    faStar = faStar;
    farStar = farStar;

    constructor(
        private restaurantService: RestaurantService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getRestaurant();
    }

    getRestaurant(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.restaurantService.getRestaurant(id)
            .subscribe(restaurant => this.restaurant = restaurant);
    }

    getIcon(i: number, reviewRating: number): IconDefinition {
        return i < reviewRating ? faStar : farStar;
    }

    getAverageRating() {
        if (!this.restaurant || !this.restaurant.reviews.length) return 'Nehodnotené';
        const average = this.restaurant.reviews.reduce((total, next) => total + next.rating, 0) / this.restaurant.reviews.length;
        return Math.round(average * 10) / 10;
    }

    goBack(): void {
        this.location.back();
    }

}
