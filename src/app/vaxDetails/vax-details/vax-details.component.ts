import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import { vaccinationDetails } from './vax-details.model';
import { VaxDetailsService } from './vax-details.service';
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

  // vaccinationDetails: any = {
  //   ppsn: "",
  //   dateOfBirth: Date,
  //   selectedGender: "",
  //   nationality: "",
  //   addressOne: "",
  //   addressTwo: "",
  //   city: "",
  //   postCode: "",
  //   selectedVaccinePreference: ""
  // };

  options: FormGroup;
  floatLabelControl = new FormControl('auto');


  constructor(fb: FormBuilder, public vaxdetailsService: VaxDetailsService) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
  };

  ngOnInit(): void {
  }

  addVaccinationDetails(form : NgForm){
    if(form.invalid){
      return;
    }

    const details: vaccinationDetails = {
      ppsn: form.value.ppsn,
      dateOfBirth: form.value.dateOfBirth,
      selectedGender: form.value.gender,
      nationality: form.value.nationality,
      addressOne: form.value.addressOne,
      addressTwo: form.value.addressTwo,
      city: form.value.city,
      postCode: form.value.postCode,
      selectedVaccinePreference: form.value.vaccinePreference
    }

    console.log(details);

    this.vaxdetailsService.postVaccinationDetails(details);
  }

}
