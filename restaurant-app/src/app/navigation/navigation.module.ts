import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GravatarModule } from 'ngx-gravatar';

@NgModule({
    declarations: [NavigationComponent],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        GravatarModule
    ],
    exports: [NavigationComponent]
})
export class NavigationModule { }
