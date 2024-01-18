import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { }
  
    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>("http://localhost:8080/user/all").pipe(
            catchError(this.handleError)
          );
    }
    

    public getUserByEmail(email: String): Observable<User> {
        return this.http.get<User>(`http://localhost:8080/user/find/${email}`).pipe(
            catchError(this.handleError)
          );
    }
  
    public addUser(user: User): Observable<User> {
      return this.http.post<User>("http://localhost:8080/user/add", user).pipe(
        catchError(this.handleError)
      );
  }
  
  public updateUser(user: User): Observable<User> {
      return this.http.put<User>("http://localhost:8080/user/update", user).pipe(
        catchError(this.handleError)
      );
  }
  
  public deleteUser(userId: number): Observable<void> {
      return this.http.delete<void>(`http://localhost:8080/user/delete/${userId}`).pipe(
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