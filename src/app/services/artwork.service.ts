import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ArtModel } from "../gallery/art.model";
import { map, catchError } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ArtworkService {
    // Saves and fetches art works

    // temporary development URL
    public apiURL: string = "https://localhost:5001/";

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

    retrieveWorks(endpoint: string) {
        console.log(endpoint)
        return this.http.get<ArtModel[]>(
            endpoint)
            .pipe(map((data: ArtModel[]) => {
                return data;
            }), catchError(error => {
                // send error somewhere
                return throwError(error); // must return observable in order to subscribe
            })
            )
    }

    addWork(endpoint: string, work: ArtModel) {
        return this.http.post(
            endpoint,
            work
        );
    }

    deleteWork(endpoint: string, work: ArtModel) {
        const workId = work.id;
        return this.http.delete(
            endpoint + "/" + workId
        );
    }

    // put req for now
    updateWork(endpoint: string, work: ArtModel, newWork: ArtModel) {
        const workId = work.id;
        return this.http.put(
            endpoint + "/" + workId,
            newWork
        );
    }


}