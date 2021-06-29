import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-vax-details',
  templateUrl: './vax-details.component.html',
  styleUrls: ['./vax-details.component.css']
})
export class VaxDetailsComponent implements OnInit {
  genderList: any = [
    {value: "Male", viewValue: "Male"},
    {value: "Female", viewValue: "Female"},
    {value: "Other", viewValue: "Other"},
    {value: "Prefer not to say", viewValue: "Prefer not to say"}
  ];

  vaccinePreferenceList: any = [
    {value: "Pfizer", viewValue: "Pfizer"},
    {value: "Astrazenaca", viewValue: "Astrazenaca"},
    {value: "Johnson and Johnson", viewValue: "Johnson and Johnson"},
    {value: "Moderna", viewValue: "Moderna"}
  ];

  vaccinationDetails: any = {
    ppsn: "",
    dateOfBirth: Date,
    selectedGender: "",
    nationality: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    postCode: "",
    selectedVaccinePreference: ""
  };



  options: FormGroup;
  floatLabelControl = new FormControl('auto');


  // vaccinationDetailsAdded = new EventEmitter();

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
  };

  ngOnInit(): void {
  }

  addVaccinationDetails(){
    // this.newPost = this.enteredValue;
    console.log(this.vaccinationDetails);
  }

}
