import { Component, OnDestroy, OnInit } from '@angular/core';

import { ArtModel } from "./art.model";
import { GalleryService } from '../gallery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  private artModels: ArtModel[];
  selWork: ArtModel = null;
  private worksChanged: Subscription;
  
  isLoading: boolean;

  selectWork(index: number) {
    this.selWork = this.artModels[index];
  }

  constructor(private galleryService: GalleryService) { }
  
  ngOnDestroy(): void {
    this.worksChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.artModels = this.galleryService.getWorks();
    this.updateWorksList();
    // testing load spinner, remove this later
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    //this.isLoading = false;
  }

  updateWorksList(): void {
    this.worksChanged = this.galleryService.worksChanged.subscribe(
      (works: ArtModel[]) => this.artModels = works
    );
  }

  closeModal() {
    this.selWork = null;
  }

}
