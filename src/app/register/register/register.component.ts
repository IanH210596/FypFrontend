import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import { UserService } from 'src/app/userService/user.service';
import { user } from 'src/app/userService/user.model';
import { Subscription } from 'rxjs';
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

  options: FormGroup;
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder, public userService: UserService) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
   }

  ngOnInit() {
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

  register(form : NgForm){
    if(form.invalid){
      return;
    }
    const userDetails: user = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      mobile: form.value.mobile,
      email: form.value.email,
      password: form.value.password
    }

    this.userService.postUser(userDetails);
    this.email = userDetails.email;
    this.password = userDetails.password;
  }

}
