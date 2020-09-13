import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../curatorpanel/auth/auth-service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed: boolean = true;
  curatorLoggedIn: boolean = false;
  isOnGalleryRoute: boolean = false;

  userSubscription: Subscription;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.curatorLoggedIn = !user ? false : true;
        console.log(this.curatorLoggedIn);
      }
    );    
    this.checkRouteForGallery();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  // does not work yet!
  checkRouteForGallery(): void {
    
    const val = this.route.pathFromRoot[1].snapshot.url[0].path;
    console.log(val);
    //this.isOnGalleryRoute = val;
  }

  logout() {
    this.authService.logout();    
    this.curatorLoggedIn = false;
  }

}
