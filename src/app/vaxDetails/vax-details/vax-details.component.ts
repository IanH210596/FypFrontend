import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { vaccinationDetails } from './vax-details.model';
import { VaxDetailsService } from './vax-details.service';

@Component({
  selector: 'app-vax-details',
  templateUrl: './vax-details.component.html',
  styleUrls: ['./vax-details.component.css']
})
export class VaxDetailsComponent implements OnInit {
  // options for gender select dropdown
  genderList: any = [
    {value: "Male", viewValue: "Male"},
    {value: "Female", viewValue: "Female"},
    {value: "Other", viewValue: "Other"},
    {value: "Prefer not to say", viewValue: "Prefer not to say"}
  ];

  // vaccines for vaccine preference select dropdown
  vaccinePreferenceList: any = [
    {value: "Pfizer", viewValue: "Pfizer"},
    {value: "Astrazenaca", viewValue: "Astrazenaca"},
    {value: "Johnson and Johnson", viewValue: "Johnson and Johnson"},
    {value: "Moderna", viewValue: "Moderna"}
  ];

  // mode set to create by default
  private mode = "create";
  isLoading = true;
  vaccinationDetails: vaccinationDetails;
  vaccinationDetailsId: string;
  form: FormGroup;
  floatLabelControl = new FormControl('auto');
  maxDate: Date;
  now: Date;


  constructor(fb: FormBuilder, public vaxdetailsService: VaxDetailsService, private snackBar: MatSnackBar) {
    // sets floating labels for the FormGroup
    this.form = fb.group({
      floatLabel: this.floatLabelControl,
    });
    this.now = new Date();
    // determining the max date for the date of birth date picker to be 18 years beforehand
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

    // subscribe to the response of the getVaccinationDetails method called when user initiates the Vaccination Details component
    this.vaxdetailsService.getVaccinationDetails().subscribe(vaxDetailsResponse => {
      this.vaccinationDetails = vaxDetailsResponse.userVaccinationDetails;
      this.vaccinationDetailsId = this.vaccinationDetails._id;
      this.isLoading = false;
      if(!this.vaccinationDetails){

      } else{
        // if vaccination details are returned for the user, then the form values are set to the preexisting vaccination details values
        // and mode updated to edit
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

  // method to save the form's entered vaccination details triggered when the save button is clicked and form submitted
  saveVaccinationDetails(){
    // if the form is invalid, ie form control inputs not allowed as they do not meet the requirements of their validators, then nothing is returned.
    if(this.form.invalid){
      return;
    }

    // if form is valid and mode is create then vaxdetailsService postVaccinationDetails method is called to add the vaccination details for the user
    if(this.mode === "create") {
      this.vaxdetailsService.postVaccinationDetails(this.form.value.ppsn, this.form.value.dateOfBirth, this.form.value.gender, this.form.value.nationality, this.form.value.addressOne, this.form.value.addressTwo, this.form.value.city, this.form.value.postCode, this.form.value.vaccinePreference).subscribe(vaxDetailsResponse => {
        this.vaccinationDetails = vaxDetailsResponse.userVaccinationDetails;
        this.vaccinationDetailsId = this.vaccinationDetails._id;
        this.mode = "edit";
        // opens success snackbar for 3000 ms in top right of app with message below
        this.snackBar.open("Vaccination Details Added Sucessfully!", "Close" , {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      });
    } else{
      // else form is valid and mode is edit then vaxdetailsService putVaccinationDetails method is called to update the existing vaccination details for the user
      this.vaxdetailsService.putVaccinationDetails(this.vaccinationDetailsId ,this.form.value.ppsn, this.form.value.dateOfBirth, this.form.value.gender, this.form.value.nationality, this.form.value.addressOne, this.form.value.addressTwo, this.form.value.city, this.form.value.postCode, this.form.value.vaccinePreference).subscribe(() =>{
        // opens success snackbar for 3000 ms in top right of app with message below
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
