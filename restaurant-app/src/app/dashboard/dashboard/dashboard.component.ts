import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../restaurant';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [
                animate(500)
            ]),
            transition('* => void', [
                animate(500)
            ])
        ])
    ]
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
