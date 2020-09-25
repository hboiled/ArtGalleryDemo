import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { CuratorService } from "../../services/curator-service";
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

  constructor(private curatorService: CuratorService) { }
 
  ngOnDestroy(): void {
    this.worksChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.artWorks = this.curatorService.getWorks();
    this.updateWorksList();
  }

  updateWorksList(): void {
    this.worksChanged = this.curatorService.worksChanged.subscribe(
      (works: ArtModel[]) => {
        this.artWorks = works;
      }
    );
  }

}
