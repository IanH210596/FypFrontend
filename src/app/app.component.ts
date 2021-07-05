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
    this.userService.autoAuthUser();
  }
}
