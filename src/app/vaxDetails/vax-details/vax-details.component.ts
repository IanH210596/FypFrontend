import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vax-details',
  templateUrl: './vax-details.component.html',
  styleUrls: ['./vax-details.component.css']
})
export class VaxDetailsComponent implements OnInit {
  enteredValue = '';
  newPost = 'No Content';

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(){
    this.newPost = this.enteredValue;
  }

}
