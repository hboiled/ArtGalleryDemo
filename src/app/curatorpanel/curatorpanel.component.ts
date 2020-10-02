import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-curatorpanel',
  templateUrl: './curatorpanel.component.html',
  styleUrls: ['./curatorpanel.component.css']
})
export class CuratorpanelComponent implements OnInit {

  trigger: boolean = true;
  catSelect: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
  }

  receiveAddWork(editMode : boolean) {        
    this.trigger = editMode;
  }

  select() {

  }

}
