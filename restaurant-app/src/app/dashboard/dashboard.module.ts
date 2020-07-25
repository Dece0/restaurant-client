import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule
    ],
    exports: [DashboardComponent]
})
export class DashboardModule { }
