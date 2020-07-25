import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { Observable, Subscription } from 'rxjs';
import { SelectedRestaurant } from 'src/app/restaurant';
import { Review } from 'src/app/review';

@Component({
    selector: 'app-reviews-form',
    templateUrl: './reviews-form.component.html',
    styleUrls: ['./reviews-form.component.scss'],
})
export class ReviewsFormComponent implements OnInit, OnDestroy {
    // icons
    faStar = faStar;
    farStar = farStar;
    // data
    maxRate: number = 5;
    overStar: number = -1;
    currentStar: number = -1;
    reviewForm = new FormGroup({
        text: new FormControl('', [Validators.required]),
        rating: new FormControl(-1, [Validators.required, Validators.min(0)]),
    });
    private subs = new Subscription();
    @Input() id: string;
    @Input() restaurant: Observable<SelectedRestaurant>;

    constructor(private reviewService: ReviewService) {}

    ngOnInit(): void {}

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    setIcon(idx): IconDefinition {
        return idx <= this.overStar || idx <= this.currentStar
            ? faStar
            : farStar;
    }

    postReview(): void {
        if (!this.reviewForm.valid) return;
        this.subs.add(
            this.reviewService
                .postReview(this.id, this.reviewForm.value)
                .subscribe(resp => this.setNewReview(resp as Review))
        );
    }

    setNewReview(review: Review) {
        this.subs.add(
            this.restaurant.subscribe((restaurant) =>
                restaurant.reviews.push(review)
            )
        );
    }
}
