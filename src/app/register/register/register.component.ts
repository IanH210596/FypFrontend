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
    }, {validators: passwordValidator});

    this.registeredUserListenerSubscription = this.userService.getRegisteredUserListener().subscribe(isRegistered => {
      this.userRegistered = isRegistered;
      if(this.userRegistered){
        this.userService.loginUser(this.email, this.password);
        // this.userService.loggedInListener.next(true);
      }
    })
    this.loggedInListenerSubscription = this.userService.getLoggedInListener().subscribe(isLoggedIn => {
      this.userIsLoggedIn = isLoggedIn;
      // if(this.userIsLoggedIn){
      //   this.router.navigate(['/vaccinationDetails']);
      // }
    });
  }

  ngOnDestroy(){
    this.loggedInListenerSubscription.unsubscribe();
    this.registeredUserListenerSubscription.unsubscribe();
  }

  onPasswordInput(){
    if(this.form.hasError('mismatch')){
      this.form.get('confirmPassword').setErrors([{'mismatch': true}]);
    }
    else{
      this.form.get('confirmPassword').setErrors(null);
    }
  }

  register(){
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

    this.userService.postUser(userDetails);
    this.email = userDetails.email;
    this.password = userDetails.password;
  }

}
