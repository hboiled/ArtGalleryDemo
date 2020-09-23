import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/artwork.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  artists: string[];
  countries: string[];
  genres: string[];
  years: number[];

  constructor(private artWorkService: ArtworkService) { }

  ngOnInit(): void {
    this.artWorkService.getCategoryList("artist").subscribe(
      (data: string[]) => {
        this.artists = data;
      }
    );

    this.artWorkService.getCategoryList("genre").subscribe(
      (data: string[]) => {
        this.genres = data;
      }
    );

    this.artWorkService.getCategoryList("country").subscribe(
      (data: string[]) => {
        this.countries = data;
      }
    );

    this.artWorkService.getCategoryList("year").subscribe(
      (data: number[]) => {
        this.years = data;
      }
    );
  }

}
