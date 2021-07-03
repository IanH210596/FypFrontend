import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import { UserService } from 'src/app/userService/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  options: FormGroup;
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder, public userService: UserService) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
   }

  ngOnInit(): void {
  }

  login(form : NgForm){
    if(form.invalid){
      return;
    }

    //need to add logic to this to check status of response and navigate to homepage
    this.userService.loginUser(form.value.email, form.value.password);
  }

}
