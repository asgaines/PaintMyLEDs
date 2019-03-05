import { Injectable } from '@angular/core';
import {
    Observable,
    throwError,
} from 'rxjs';
import {
    catchError,
    map,
} from 'rxjs/operators';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Painting } from '../../paintings/painting';
import { environment } from '../../../environments/environment';

@Injectable()
export class APIService {
    protected apiUrl: string = `${environment.url}/api`;

    constructor(protected _http: HttpClient) {
    }

    getPaintings = (): Observable<Painting[]> => {
        return this._http.get<any>(`${this.apiUrl}/paintings`, {}).pipe(
            catchError(this._handleError)
        );
    };

    postPainting = (painting: Painting, save: boolean): Observable<any> => {
        return this._http.post<any>(`${this.apiUrl}/paintings`, {painting: painting, save: save}, {}).pipe(
            catchError(this._handleError)
        );
    };

    private _handleError = (resp: HttpErrorResponse) => {
        if (resp.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error(`An error occurred: ${resp.error.message}`);
        } else {
            // The backend returned an unsuccessful response code.
            console.error(`Received API response status: ${resp.status}`);

            if (resp.error.errors !== undefined) {
                for (const err of resp.error.errors) {
                    console.error(err.message);
                }
            }
        }

        return throwError(
            {
                description: 'An error occurred, please try again later',
                status_code: resp.status,
                errors: resp.error
            });
    };
}
