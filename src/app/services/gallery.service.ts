import { Injectable, OnInit } from "@angular/core";

import { ArtModel } from "../gallery/art.model";
import { ArtworkService } from "./artwork.service";
import { BrowseService } from "./browse-service";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GalleryService {

    constructor(private artWorkService: ArtworkService,
        private browseService: BrowseService) {
        this.initWorks();
        this.getWorks();
    }

    initWorks(): void {
        this.artWorkService.retrieveWorks()
            .subscribe(
                works => this.setWorks(works)
            )
    }

    artwork: ArtModel[] = [];
    worksChanged = new Subject<ArtModel[]>();

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

    searchWorks(query: string) {
        this.browseService.searchWorks(query).subscribe(
            (data: ArtModel[]) => {
                this.setWorks(data);
            }
        )
    }

    filterWorks(cat: string, val: string) {
        switch (cat) {
            case "Artists:":
                this.applyArtistFilter(val);
                break;
            case "Genres:":
                this.applyGenreFilter(val);
                break;
            case "Countries:":
                this.applyCountryFilter(val);
                break;
            case "Years:":
                this.applyYearFilter(val);
                break;
        }
    }

    applyArtistFilter(val: string) {        
        const category = "artist";
        this.browseService.filterByCategory(category, val).subscribe(
            (data: ArtModel[]) => {
                this.setWorks(data);
            }
        )
    }

    applyGenreFilter(val: string) {
        const category = "genre";
        this.browseService.filterByCategory(category, val).subscribe(
            (data: ArtModel[]) => {
                this.setWorks(data);
            }
        )
    }

    applyCountryFilter(val: string) {
        const category = "country";
        this.browseService.filterByCategory(category, val).subscribe(
            (data: ArtModel[]) => {
                this.setWorks(data);
            }
        )
    }

    applyYearFilter(val: string) {
        const category = "year";
        this.browseService.filterByCategory(category, val).subscribe(
            (data: ArtModel[]) => {
                this.setWorks(data);
            }
        )
    }

    // CUD functs
    addWork(work: ArtModel) {
        //this.artwork.push(work);
        return this.artWorkService.addWork(work);
        //this.worksChanged.next(this.getWorks());
    }

    // subscription needed still?
    updateWork(work, newWork: ArtModel) {
        //this.artwork[index] = work;
        return this.artWorkService.updateWork(work, newWork);
        //this.worksChanged.next(this.getWorks());
    }

    deleteWork(work: ArtModel) {
        return this.artWorkService.deleteWork(work);
        //this.artwork.splice(index, 1);
        //this.worksChanged.next(this.getWorks());
    }


}