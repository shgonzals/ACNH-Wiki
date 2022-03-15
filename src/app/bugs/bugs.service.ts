import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Bug } from "./bug";

@Injectable({
    providedIn: 'root'
})
export class BugsService{

    private GET_USERS_URL = 'http://acnhapi.com/v1/bugs/';
    private USER_URL = 'http://acnhapi.com/v1/bugs/:id';

    constructor(private http: HttpClient) {}

    getBug(id: string): Observable<Bug> {
        return this.http.get<Bug>(this.USER_URL).pipe(
            catchError(this.handleError)
        );
    }

    getBugs(): Observable<Bug[]> {
        return this.http.get<Bug[]>(this.GET_USERS_URL).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error ocurred: ${err.error.message}`; 
        }else{
            errorMessage = `Server returned code : ${err.status}, error message is: ${err.error.message}`;
        }
        return throwError(errorMessage)
    }
}