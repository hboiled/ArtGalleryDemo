import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error: string = null;

  constructor() { }

  ngOnInit(): void {
  }

  signIn(form: NgForm): void {
    // if (!form.valid) {
    //   return;
    // }

    this.error = null;

    // todo: implement form validation logic
    this.error = "This sign in form is currently not yet implemented.";

    form.reset();
  }

}
