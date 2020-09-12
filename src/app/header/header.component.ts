import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../curatorpanel/auth/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed: boolean = true;
  curatorLoggedIn: boolean = false;

  userSubscription: Subscription;

  constructor(private authService: AuthService) { }

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

  logout() {
    this.authService.logout();    
    this.curatorLoggedIn = false;
  }

}
