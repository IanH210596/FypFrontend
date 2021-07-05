import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
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

  options: FormGroup;
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder, public userService: UserService) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
   }

  ngOnInit() {
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

  login(form : NgForm){
    if(form.invalid){
      return;
    }
    this.userService.loginUser(form.value.email, form.value.password);

    // .then(() => {
    //   if(this.userService.loggedIn){
    //     this.router.navigate(['/vaccinationDetails']);
    //   }
    // });

  }

}
