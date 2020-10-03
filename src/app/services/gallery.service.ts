import { Injectable } from "@angular/core";

import { ArtModel } from "../gallery/art.model";
import { ArtworkService } from "./artwork.service";
import { BrowseService } from "./browse-service";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GalleryService {

    private apiUrl: string;
    
    artwork: ArtModel[] = [];

    worksChanged: Subject<ArtModel[]> = new Subject<ArtModel[]>();
    gallerySelection: Subject<string> = new Subject<string>();

    setApiUrl(cat: string): void {
        this.gallerySelection.next(cat);
        this.apiUrl = `https://localhost:5001/api/${cat}`;
        this.initWorks();
        this.getWorks();        
    }

    constructor(private artWorkService: ArtworkService,
        private browseService: BrowseService) {        
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

    searchWorks(cat: string, query: string) {
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
}