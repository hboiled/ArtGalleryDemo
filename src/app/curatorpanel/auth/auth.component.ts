import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "./auth-service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string = null;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signIn(form: NgForm): void {
    this.error = null;

    const cId = form.value.curatorId;
    const pw = form.value.password;

    this.authService.signIn(cId, pw).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/curator']);
      },
      errorMsg => {
        this.error = errorMsg;
      }
    );

    form.reset();
  }

}
