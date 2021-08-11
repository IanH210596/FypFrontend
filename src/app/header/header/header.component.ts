import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Typescript for Angular Material Toolbar - Header Component for my application once logged in. See Documentation: https://material.angular.io/components/toolbar/overview
  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }


  // onLogout() method triggered upon clicking the Logout button on the header.component HTML template. This then calls the userService.logout() method.
  onLogout(){
    this.userService.logout();
  }
}
