import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant, SelectedRestaurant } from '../restaurant';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {
    api = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getRestaurants(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(`${this.api}/restaurants`)
            .pipe(
                catchError(this.handleError<Restaurant[]>('getRestaurants', []))
            );
    }

    getRestaurant(id: string): Observable<SelectedRestaurant> {
        return this.http.get<SelectedRestaurant>(`${this.api}/restaurants/${id}`)
            .pipe(
                catchError(this.handleError<SelectedRestaurant>(`getRestaurant id=${id}`))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
        
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
        
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
