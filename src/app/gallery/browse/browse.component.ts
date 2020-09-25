import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';
import { BrowseService } from 'src/app/services/browse-service';
import { GalleryService } from 'src/app/services/gallery.service';
import { ArtModel } from '../art.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  artists: {val: string, amount: number}[] = [];
  countries: {val: string, amount: number}[] = [];
  genres: {val: string, amount: number}[] = [];
  years: {val: number, amount: number}[] = [];
  
  @Output() onClose = new EventEmitter<void>();
  @Output() filterQuery = new EventEmitter<{cat: string, val: string}>();

  displayEntryCount: boolean = false;
  
  constructor(private browseService: BrowseService,
    private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.browseService.getCategoryList("artist").subscribe(
      (data: string[]) => {
        data.forEach(element => {
          this.artists.push({val: element, amount: 0});
        });
      }
    );
    console.log(this.artists)

    this.browseService.getCategoryList("genre").subscribe(
      (data: string[]) => {
        data.forEach(element => {
          this.genres.push({val: element, amount: 0});
        });
      }
    );

    this.browseService.getCategoryList("country").subscribe(
      (data: string[]) => {
        data.forEach(element => {
          this.countries.push({val: element, amount: 0});
        });
      }
    );

    this.browseService.getCategoryList("year").subscribe(
      (data: number[]) => {
        data.forEach(element => {
          this.years.push({val: element, amount: 0});
        });
      }
    );
  }

  selectFilter(filter: string, heading: HTMLHeadingElement): void {
    //console.log(filter);
    //console.log(heading.textContent); 
    this.filterQuery.emit(
      {
        cat: heading.textContent,
        val: filter
      });
    this.close();
  }

  close(): void {
    this.onClose.emit();
  }

  resetFilters(): void {
    
  }

  calculateDisplayEntryCount(): void {
    this.artists.forEach(element => {
      this.browseService.filterByCategory("artist", element.val).subscribe(
        (data: ArtModel[]) => {
          element.amount = data.length;
        }
      )
    });
    
    this.genres.forEach(element => {
      this.browseService.filterByCategory("genre", element.val).subscribe(
        (data: ArtModel[]) => {
          element.amount = data.length;
        }
      )
    });

    this.countries.forEach(element => {
      this.browseService.filterByCategory("country", element.val).subscribe(
        (data: ArtModel[]) => {
          element.amount = data.length;
        }
      )
    });

    this.years.forEach(element => {
      this.browseService.filterByCategory("year", element.val.toFixed()).subscribe(
        (data: ArtModel[]) => {
          element.amount = data.length;
        }
      )
    });
    this.displayEntryCount = this.displayEntryCount === true ? false : true;
  }
}
