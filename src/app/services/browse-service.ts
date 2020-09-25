import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ArtModel } from "../gallery/art.model";
import { map, catchError } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrowseService {
    // Saves and fetches art works

    // temporary development URL
    private apiURL: string = "https://localhost:5001/api/Filter";

    constructor(private http: HttpClient) {}

    searchWorks(query: string) {
        return this.http.get<ArtModel[]>(
            this.apiURL + "/search/" + query)
            .pipe(map((data: ArtModel[]) => {
                console.log(data)
                return data;
            }), catchError(error => {
                // send error somewhere
                return throwError(error); // must return observable in order to subscribe
            })
            )
    }

    getCategoryList(type: string,) {

        return this.http.get(
            this.apiURL + "/" + type);
            // .pipe(map((data: string[]) => {                
            //     return data;
            // }), catchError(error => {
            //     // send error somewhere
            //     return throwError(error); // must return observable in order to subscribe
            // })
            // )
    }

    filterByCategory(cat: string, query: string) {

        return this.http.get(
            this.apiURL + "/" + cat + "/" + query);
            // .pipe(map((data: string[]) => {                
            //     return data;
            // }), catchError(error => {
            //     // send error somewhere
            //     return throwError(error); // must return observable in order to subscribe
            // })
            // )
    }
}