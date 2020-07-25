import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../review';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';

@Component({
    selector: 'app-reviews-list',
    templateUrl: './reviews-list.component.html',
    styleUrls: ['./reviews-list.component.scss'],
    animations: [
        trigger('fade', [
            state('void', style({ opacity: 0 })),
            transition('void => *', [animate(500)]),
            transition('* => void', [animate(500)]),
        ]),
    ]
})
export class ReviewsListComponent implements OnInit {
    faStar = faStar;
    farStar = farStar;

    @Input() reviews: Review[];

    constructor() {}

    ngOnInit(): void {}

    getIcon(i: number, reviewRating: number): IconDefinition {
        return i < reviewRating ? faStar : farStar;
    }
}
