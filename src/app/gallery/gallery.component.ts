import { Component, OnInit } from '@angular/core';

import { ArtModel } from "./art.model";
import { GalleryService } from '../gallery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  artModels: ArtModel[];
  selWork: ArtModel = null;
  private worksChanged: Subscription;

  selectWork(index: number) {
    this.selWork = this.artModels[index];
  }

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.artModels = this.galleryService.getWorks();
    this.updateWorksList();
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
