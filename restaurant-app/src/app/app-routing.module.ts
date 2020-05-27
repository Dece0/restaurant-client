import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/restaurants', pathMatch: 'full'
    },
    {
        path: 'restaurants', component: DashboardComponent
    },
    {
        path: 'restaurant/:id', component: RestaurantComponent
    },
    {
        path: 'profile', component: DashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }