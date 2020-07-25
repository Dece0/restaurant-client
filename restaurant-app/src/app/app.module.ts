import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthModule } from './auth/auth.module';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { GravatarModule } from 'ngx-gravatar';
export function tokenGetter() {
    const data = JSON.parse(localStorage.getItem('info'));
    return data.token.value;
}

@NgModule({
    declarations: [AppComponent, ProfileComponent],
    imports: [
        BrowserModule,
        NavigationModule,
        DashboardModule,
        RestaurantModule,
        AuthModule,
        AppRoutingModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['http://localhost:3000/'],
                blacklistedRoutes: ['http://example.com/examplebadroute/'],
            },
        }),
        GravatarModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
