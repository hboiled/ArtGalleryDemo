import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ArtModel } from '../../art.model';

@Component({
  selector: 'app-art-display-info',
  templateUrl: './art-display-info.component.html',
  styleUrls: ['./art-display-info.component.css']
})
export class ArtDisplayInfoComponent implements OnInit {

  @Output() onClose = new EventEmitter<void>();
  @Input() artWork: ArtModel; // get artwork from display
  
  viewerOpen: boolean = false;
  
  close(): void {
    this.onClose.emit();
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
