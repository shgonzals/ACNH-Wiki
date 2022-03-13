import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Villager } from "./villager";
import { Proyecto } from "./proyecto";

@Injectable({
    providedIn: 'root'
})
export class VillagersService{

    private GET_USERS_URL = 'http://acnhapi.com/v1/villagers/';
    private USER_URL = 'http://acnhapi.com/v1/villagers/:id';

    constructor(private http: HttpClient) {}

    getVillager(id: string): Observable<Villager> {
        return this.http.get<Villager>(this.USER_URL).pipe(
            catchError(this.handleError)
        );
    }

    getVillagers(): Observable<Villager[]> {
        return this.http.get<Villager[]>(this.GET_USERS_URL).pipe(
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