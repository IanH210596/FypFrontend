import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/userService/user.service';
import { user } from 'src/app/userService/user.model';
import { Subscription } from 'rxjs';
import { passwordValidator } from 'src/app/validators/password-validator';

// import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private loggedInListenerSubscription: Subscription;
  private registeredUserListenerSubscription: Subscription;
  userIsLoggedIn = false;
  userRegistered = false;
  private email: string;
  private password: string;

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
      'firstName': new FormControl(null, {validators: [Validators.required]}),
      'lastName': new FormControl(null, {validators: [Validators.required]}),
      'mobile': new FormControl(null, {validators: [Validators.required]}),
      'email': new FormControl(null, {validators: [Validators.required, Validators.email]}),
      'password': new FormControl(null, {validators: [Validators.required]}),
      'confirmPassword': new FormControl(null, {validators: [Validators.required]})
    }, {validators: passwordValidator}); //custom cross field validator to check that password and confirm password fields match

    // subscribes to userService getRegisteredUserListener which returns an Observable denoting whether or not the user is successfully registered
    this.registeredUserListenerSubscription = this.userService.getRegisteredUserListener().subscribe(isRegistered => {
      this.userRegistered = isRegistered;
      // if the user is registered successfully, then they are automatically logged in
      if(this.userRegistered){
        this.userService.loginUser(this.email, this.password);
      }
    })
    this.loggedInListenerSubscription = this.userService.getLoggedInListener().subscribe(isLoggedIn => {
      this.userIsLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(){
    this.loggedInListenerSubscription.unsubscribe();
    this.registeredUserListenerSubscription.unsubscribe();
  }

  // method triggered everytime something input to the password or confirm password inputs
  onPasswordInput(){
    // if the form has a password mismatch error, then mismatch error is set for the confirm password form control
    if(this.form.hasError('mismatch')){
      this.form.get('confirmPassword').setErrors([{'mismatch': true}]);
    }
    else{
      this.form.get('confirmPassword').setErrors(null);
    }
  }

  register(){
    // if the form is invalid, ie form control inputs not allowed as they do not meet the requirements of their validators, then nothing is returned.
    if(this.form.invalid){
      return;
    }
    const userDetails: user = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      mobile: this.form.value.mobile,
      email: this.form.value.email,
      password: this.form.value.password
    }

    // However, if the form is valid, then userService postUser method is called using the form's inputs to attempt to register the user.
    this.userService.postUser(userDetails);
    this.email = userDetails.email;
    this.password = userDetails.password;
  }

}
