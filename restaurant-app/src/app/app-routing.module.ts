import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RestaurantComponent } from './restaurant/restaurant/restaurant.component';

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/restaurants',
        pathMatch: 'full'
    },
    {
        path: 'restaurants',
        component: DashboardComponent
    },
    {
        path: 'restaurant/:id',
        component: RestaurantComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }