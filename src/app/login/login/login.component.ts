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
      // if(this.userIsLoggedIn){
      //   this.router.navigate(['/vaccinationDetails']);
      // }
    });
  }

  ngOnDestroy() {
    this.loggedInListenerSubscription.unsubscribe();
  }

  login(){
    if(this.form.invalid){
      return;
    }
    this.userService.loginUser(this.form.value.email, this.form.value.password);

    // .then(() => {
    //   if(this.userService.loggedIn){
    //     this.router.navigate(['/vaccinationDetails']);
    //   }
    // });

  }

}
