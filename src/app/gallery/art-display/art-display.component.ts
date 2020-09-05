import { Component, OnInit, Input } from '@angular/core';

import { ArtModel } from "../art.model";
import { GalleryService } from 'src/app/gallery.service';

@Component({
  selector: 'app-art-display',
  templateUrl: './art-display.component.html',
  styleUrls: ['./art-display.component.css']
})
export class ArtDisplayComponent implements OnInit {

  @Input() index: number;
  artWork: ArtModel;

  placeholder: string = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081";
  
  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.artWork = this.galleryService.getWork(this.index);
  }

  // validateImage(): string {
  //   var http = new XMLHttpRequest();

  //   http.open('HEAD', this.artWork.imgPath, false);
  //   http.send();

  //   return http.status != 200 ? this.placeholder : this.artWork.imgPath;
  // }

}
