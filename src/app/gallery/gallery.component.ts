import { Component, OnDestroy, OnInit } from '@angular/core';

import { ArtModel } from "./art.model";
import { GalleryService } from '../services/gallery.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  artModels: ArtModel[];
  selWork: ArtModel = null;
  category: string = "painting";

  gallerySelSubscription: Subscription;
  worksChanged: Subscription;

  isLoading: boolean;

  browseOpen: boolean = false;

  searchByTitle: FormGroup;

  selectWork(index: number) {
    this.selWork = this.artModels[index];
  }

  constructor(private galleryService: GalleryService) { }

  ngOnDestroy(): void {
    this.worksChanged.unsubscribe();
    this.gallerySelSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.gallerySelSubscription = this.galleryService.gallerySelection.subscribe(
      (category: string) => {
        this.category = category;        
      }
    )
    
    this.initWorks();
    
    this.initForm();
  }

  initWorks() {
    this.isLoading = true;
    this.galleryService.setApiUrl(this.category);
    this.artModels = this.galleryService.getWorks();
    this.updateWorksList();
    // testing load spinner, remove this later
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  initForm() {
    this.searchByTitle = new FormGroup({
      query: new FormControl(null, Validators.required)
    });
  }

  updateWorksList(): void {
    this.worksChanged = this.galleryService.worksChanged.subscribe(
      (works: ArtModel[]) => this.artModels = works
    );
  }

  closeDisplayModal(): void {
    this.selWork = null;
  }

  closeBrowseModal(): void {
    this.browseOpen = false;
  }

  search(): void {
    const query = this.searchByTitle.value['query'];

    this.galleryService.searchWorks(this.category, query);
  }

  setFilter({ cat, val }): void {
    console.log(cat + " " + val);

    this.galleryService.filterWorks(cat, val);
  }

  resetFilters(): void {
    this.galleryService.initWorks();
  }
}
