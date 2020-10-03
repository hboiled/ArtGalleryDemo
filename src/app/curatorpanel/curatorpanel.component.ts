import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-curatorpanel',
  templateUrl: './curatorpanel.component.html',
  styleUrls: ['./curatorpanel.component.css']
})
export class CuratorpanelComponent implements OnInit {

  trigger: boolean = true;
  catSelect: Subject<string> = new Subject<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  receiveAddWork(editMode: boolean) {
    this.trigger = editMode;
  }

  public isActive(url): boolean {
    console.log(this.router.url.includes(url))
    
    return this.router.url.includes(url);
  }

}
