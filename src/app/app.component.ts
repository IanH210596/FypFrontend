import { Component, OnInit } from '@angular/core';
import { UserService } from './userService/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FypFrontend';

  constructor(private userService: UserService){}

  ngOnInit(){
    // everytime the application is started the userService autoAuthUser method is called
    // to check if a valid token which has not yet expired is available to auto-login the user
    this.userService.autoAuthUser();
  }
}
