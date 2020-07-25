import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GravatarModule } from 'ngx-gravatar';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { ReviewsFormComponent } from './reviews-form/reviews-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        RestaurantComponent,
        ReviewsListComponent,
        ReviewsFormComponent,
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        GravatarModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [RestaurantComponent, ReviewsListComponent, ReviewsFormComponent],
})
export class RestaurantModule {}
