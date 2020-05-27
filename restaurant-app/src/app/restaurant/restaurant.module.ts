import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GravatarModule } from 'ngx-gravatar';

@NgModule({
    declarations: [RestaurantComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        GravatarModule
    ],
    exports: [RestaurantComponent]
})
export class RestaurantModule { }
