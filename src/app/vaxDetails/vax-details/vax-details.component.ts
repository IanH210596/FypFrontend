import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
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
  form: FormGroup;
  floatLabelControl = new FormControl('auto');
  maxDate: Date;
  now: Date;


  constructor(fb: FormBuilder, public vaxdetailsService: VaxDetailsService, private snackBar: MatSnackBar) {
    this.form = fb.group({
      floatLabel: this.floatLabelControl,
    });
    this.now = new Date();
    this.maxDate = new Date(this.now.getFullYear()-18, this.now.getMonth(), this.now.getDay());
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      'ppsn': new FormControl(null, {validators: [Validators.required]}),
      'dateOfBirth': new FormControl(null, {validators: [Validators.required]}),
      'gender': new FormControl(null, {validators: [Validators.required]}),
      'nationality': new FormControl(null, {validators: [Validators.required]}),
      'addressOne': new FormControl(null, {validators: [Validators.required]}),
      'addressTwo': new FormControl(null, {validators: [Validators.required]}),
      'city': new FormControl(null, {validators: [Validators.required]}),
      'postCode': new FormControl(null, {validators: [Validators.required]}),
      'vaccinePreference': new FormControl(null, {validators: [Validators.required]})
    });

    this.vaxdetailsService.getVaccinationDetails().subscribe(vaxDetailsResponse => {
      this.vaccinationDetails = vaxDetailsResponse.userVaccinationDetails;
      this.vaccinationDetailsId = this.vaccinationDetails._id;
      this.isLoading = false;
      if(!this.vaccinationDetails){

      } else{
        this.mode = "edit";
        this.form.setValue({
          'ppsn': this.vaccinationDetails.ppsn,
          'dateOfBirth': formatDate(this.vaccinationDetails.dateOfBirth, 'yyyy-MM-dd', 'en'),
          'gender': this.vaccinationDetails.selectedGender,
          'nationality': this.vaccinationDetails.nationality,
          'addressOne': this.vaccinationDetails.addressOne,
          'addressTwo': this.vaccinationDetails.addressTwo,
          'city': this.vaccinationDetails.city,
          'postCode': this.vaccinationDetails.postCode,
          'vaccinePreference': this.vaccinationDetails.selectedVaccinePreference
        });
      }
    }, error => {
      this.isLoading = false;
    });
  }

  saveVaccinationDetails(){
    if(this.form.invalid){
      return;
    }

    if(this.mode === "create") {
      this.vaxdetailsService.postVaccinationDetails(this.form.value.ppsn, this.form.value.dateOfBirth, this.form.value.gender, this.form.value.nationality, this.form.value.addressOne, this.form.value.addressTwo, this.form.value.city, this.form.value.postCode, this.form.value.vaccinePreference).subscribe(vaxDetailsResponse => {
        this.vaccinationDetails = vaxDetailsResponse.userVaccinationDetails;
        this.vaccinationDetailsId = this.vaccinationDetails._id;
        this.mode = "edit";
        this.snackBar.open("Vaccination Details Added Sucessfully!", "Close" , {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      });
    } else{
      this.vaxdetailsService.putVaccinationDetails(this.vaccinationDetailsId ,this.form.value.ppsn, this.form.value.dateOfBirth, this.form.value.gender, this.form.value.nationality, this.form.value.addressOne, this.form.value.addressTwo, this.form.value.city, this.form.value.postCode, this.form.value.vaccinePreference).subscribe(() =>{
        this.snackBar.open("Vaccination Details Updated Sucessfully!", "Close" , {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      });
    }
  }

}
