import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ArtModel } from "../gallery/art.model";
import { map, catchError } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArtworkService {
    // Saves and fetches art works

    // temporary development URL
    private apiURL: string = "https://localhost:5001/api/ArtWorks";

    constructor(private http: HttpClient) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.status !== 200) {
                console.log("Server offline")
            } else {
                console.log("Server online")
            }
        }

        xhttp.open("GET", this.apiURL);
        xhttp.send();
    }

    retrieveWorks() {
        return this.http.get<ArtModel[]>(
            this.apiURL)
            .pipe(map((data: ArtModel[]) => {
                console.log("retrieve works called")

                return data;
            }), catchError(error => {
                // send error somewhere
                return throwError(error); // must return observable in order to subscribe
            })
            )
    }

    addWork(work: ArtModel) {
        return this.http.post(
            this.apiURL,
            work
        );
    }

    deleteWork(work: ArtModel) {
        const workId = work.id;
        return this.http.delete(
            this.apiURL + "/" + workId
        );
    }

    // put req for now
    updateWork(work: ArtModel, newWork: ArtModel) {
        const workId = work.id;
        return this.http.put(
            this.apiURL + "/" + workId,
            newWork
        );
    }

    
}