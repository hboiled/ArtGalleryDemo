import { Injectable, OnInit } from "@angular/core";

import { ArtModel } from "../gallery/art.model";
import { ArtworkService } from "./artwork.service";
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CuratorService {

    private apiUrl: string;
    
    artwork: ArtModel[] = [];
    worksChanged = new Subject<ArtModel[]>();

    setApiUrl(cat: string): void {
        this.apiUrl = `https://localhost:5001/api/${cat}`;
        this.initWorks();
        this.getWorks();
        console.log(this.apiUrl)
    }

    constructor(private artWorkService: ArtworkService) {        
    }

    initWorks(): void {
        this.artWorkService.retrieveWorks(this.apiUrl)
            .subscribe(
                works => this.setWorks(works)
            );
    }

    getWorks(): ArtModel[] {
        console.log(this.artwork)
        return this.artwork.slice();
    }

    getWork(index: number): ArtModel {
        return this.artwork[index];
    }

    setWorks(works: ArtModel[]) {
        this.artwork = works;
        this.worksChanged.next(this.getWorks());
    }

    // CUD functs
    addWork(work: ArtModel) {
        //this.artwork.push(work);
        return this.artWorkService.addWork(this.apiUrl, work);
        //this.worksChanged.next(this.getWorks());
    }

    // subscription needed still?
    updateWork(work, newWork: ArtModel) {
        //this.artwork[index] = work;
        return this.artWorkService.updateWork(this.apiUrl, work, newWork);
        //this.worksChanged.next(this.getWorks());
    }

    deleteWork(work: ArtModel) {
        return this.artWorkService.deleteWork(this.apiUrl, work);
        //this.artwork.splice(index, 1);
        //this.worksChanged.next(this.getWorks());
    }
}