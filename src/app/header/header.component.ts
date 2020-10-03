import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../curatorpanel/auth/auth-service';
import { Location } from "@angular/common";
import { GalleryService } from '../services/gallery.service';

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
    private galleryService: GalleryService,
    ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.curatorLoggedIn = !user ? false : true;
        console.log(this.curatorLoggedIn);
      }
    );    
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  setGallery(cat: string) {
    this.galleryService.setApiUrl(cat);
  }

  logout() {
    this.authService.logout();    
    this.curatorLoggedIn = false;
  }

}
