import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../restaurant';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review, PostReview } from '../review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
    api = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getReviews(id: string): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.api}/reviews/${id}`)
            .pipe(
                catchError(this.handleError<Review[]>(`getReviews id=${id}`))
            );
    }

    postReview(id: string, review: PostReview) {
        return this.http.post<PostReview>(`${this.api}/reviews/${id}`, review)
            .pipe(
                catchError(this.handleError<PostReview>(`postReview`))
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
