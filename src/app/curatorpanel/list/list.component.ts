import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { GalleryService } from "../../services/gallery.service";
import { ArtModel } from 'src/app/gallery/art.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {

  artWorks: ArtModel[] = [];
  
  private worksChanged: Subscription;

  constructor(private galleryService: GalleryService) { }
 
  ngOnDestroy(): void {
    this.worksChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.artWorks = this.galleryService.getWorks();
    this.updateWorksList();
  }

  updateWorksList(): void {
    this.worksChanged = this.galleryService.worksChanged.subscribe(
      (works: ArtModel[]) => this.artWorks = works
    );
  }

}
