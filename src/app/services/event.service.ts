import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MyEvent } from '../event';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http: HttpClient) { }

  getEvents(): Observable<MyEvent[]> {
    return this.http.get<MyEvent[]>("http://localhost:8080/event/all").pipe(
      catchError(this.handleError)
    );
  }

  addEvent(newEvent: MyEvent): Observable<MyEvent> {
    return this.http.post<MyEvent>("http://localhost:8080/event/add", newEvent).pipe(
      catchError(this.handleError)
    );
  }

  updateEvent(event: MyEvent): Observable<MyEvent> {
    return this.http.put<MyEvent>("http://localhost:8080/event/update", event).pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/event/delete/${eventId}`).pipe(
      catchError(this.handleError)
    );
  }

  getEventById(eventId: number): Observable<void> {
    return this.http.get<void>(`http://localhost:8080/event/find/${eventId}`).pipe(
      catchError(this.handleError)
    );
}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }





}


