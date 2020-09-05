import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curatorpanel',
  templateUrl: './curatorpanel.component.html',
  styleUrls: ['./curatorpanel.component.css']
})
export class CuratorpanelComponent implements OnInit {

  trigger: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  receiveAddWork(editMode : boolean) {        
    this.trigger = editMode;
  }


}
