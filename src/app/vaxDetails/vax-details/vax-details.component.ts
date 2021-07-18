import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/userService/user.service';
import { formatWithOptions } from 'util';
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

  private mode = "create";
  isLoading = true;
  vaccinationDetails: vaccinationDetails;
  vaccinationDetailsId: string;
  options: FormGroup;
  floatLabelControl = new FormControl('auto');


  constructor(fb: FormBuilder, public vaxdetailsService: VaxDetailsService) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    });
  };

  ngOnInit(): void {
    this.vaxdetailsService.getVaccinationDetails().subscribe(vaxDetailsResponse => {
      this.vaccinationDetails = vaxDetailsResponse.userVaccinationDetails;
      this.vaccinationDetailsId = this.vaccinationDetails._id;
      this.isLoading = false;
      if(!this.vaccinationDetails){

      } else{
        this.mode = "edit";
      }
    }, error => {
      this.isLoading = false;
    });
  }

  saveVaccinationDetails(form : NgForm){
    if(form.invalid){
      return;
    }

    if(this.mode === "create") {
      this.vaxdetailsService.postVaccinationDetails(form.value.ppsn, form.value.dateOfBirth, form.value.gender, form.value.nationality, form.value.addressOne, form.value.addressTwo, form.value.city, form.value.postCode, form.value.vaccinePreference).subscribe(vaxDetailsResponse => {
        this.vaccinationDetails = vaxDetailsResponse.userVaccinationDetails;
        this.vaccinationDetailsId = this.vaccinationDetails._id;
        this.mode = "edit";
      });
    } else{
      this.vaxdetailsService.putVaccinationDetails(this.vaccinationDetailsId ,form.value.ppsn, form.value.dateOfBirth, form.value.gender, form.value.nationality, form.value.addressOne, form.value.addressTwo, form.value.city, form.value.postCode, form.value.vaccinePreference);
    }
  }

}
