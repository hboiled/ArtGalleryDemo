import { Component, OnInit, Input } from '@angular/core';
import { ArtModel } from 'src/app/gallery/art.model';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.css']
})
export class ItemDisplayComponent implements OnInit {

  @Input() index: number;
  selWork: ArtModel;

  
  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    // recheck this
    const work: ArtModel = this.galleryService.getWork(this.index);
    this.selWork = work === null ? null : work;
  }

}
