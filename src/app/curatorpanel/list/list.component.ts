import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';

import { CuratorService } from "../../services/curator-service";
import { ArtModel } from 'src/app/gallery/art.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy {

  @Input() category: string = "painting"; //default
  selection: string;

  artWorks: ArtModel[] = [];
  
  private worksChanged: Subscription;

  constructor(private curatorService: CuratorService,
    private route: ActivatedRoute) { } 

  ngOnInit(): void {    
    this.category = this.route.snapshot.routeConfig["path"];
    this.init();
  }

  ngOnDestroy(): void {
    this.worksChanged.unsubscribe();
  }

  init() {
    this.curatorService.setApiUrl(this.category);
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

  setCategory(): void {
    this.category = "sculpture";
    this.init();
  }

}
