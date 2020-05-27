import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    restaurants: Restaurant[] = [];
    faMapMarkerAlt = faMapMarkerAlt;

    constructor(private restauratService: RestaurantService) { }

    ngOnInit(): void {
        this.getRestaurants();
    }

    getRestaurants(): void {
        this.restauratService.getRestaurants()
            .subscribe(restaurants =>
                this.restaurants = restaurants
            )
    }

}
