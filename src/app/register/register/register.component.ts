import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import { UserService } from 'src/app/userService/user.service';
import { user } from 'src/app/userService/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  options: FormGroup;
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder, public userService: UserService) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
   }

  ngOnInit(): void {
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
  }

}
