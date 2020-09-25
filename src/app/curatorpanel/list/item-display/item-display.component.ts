import { Component, OnInit, Input } from '@angular/core';
import { ArtModel } from 'src/app/gallery/art.model';
import { CuratorService } from 'src/app/services/curator-service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.css']
})
export class ItemDisplayComponent implements OnInit {

  @Input() index: number;
  selWork: ArtModel;

  
  constructor(private curatorService: CuratorService) { }

  ngOnInit(): void {
    // recheck this
    const work: ArtModel = this.curatorService.getWork(this.index);
    this.selWork = work === null ? null : work;
  }

}
