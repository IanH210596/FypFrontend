import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { UserService } from 'src/app/userService/user.service';
// import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loggedInListenerSubscription: Subscription;
  userIsLoggedIn = false;

  form: FormGroup;
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder, public userService: UserService) {
    // sets floating labels for the FormGroup
    this.form = fb.group({
      floatLabel: this.floatLabelControl,
    });
   }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'password': new FormControl(null, {validators: [Validators.required]}),
    });


    this.loggedInListenerSubscription = this.userService.getLoggedInListener().subscribe(isLoggedIn => {
      this.userIsLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.loggedInListenerSubscription.unsubscribe();
  }

  login(){
    // if the form is invalid, ie form control inputs not allowed as they do not meet the requirements of their validators, then nothing is returned.
    if(this.form.invalid){
      return;
    }
    // However, if the form is valid, then userService loginUser method is called using the form's email and password inputs to attempt to login the user.
    this.userService.loginUser(this.form.value.email, this.form.value.password);
  }

}
