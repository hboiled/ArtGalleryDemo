import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "./auth-service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn(form: NgForm): void {
    // if (!form.valid) {
    //   return;
    // }

    this.error = null;

    const cId = form.value.curatorId;
    const pw = form.value.password;

    this.authService.signIn(cId, pw).subscribe(
      response => {
        console.log(response);
      }
    );

    // todo: implement form validation logic
    this.error = "This sign in form is currently not yet implemented.";

    form.reset();
  }

}
