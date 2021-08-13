import { Injectable } from '@angular/core';
import { vaccinationDetails } from './vax-details.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaxDetailsService {

  constructor(private http: HttpClient) { }

  // method to make HTTP GET request to API to get any existing vaccination details for user
  getVaccinationDetails(){
      return this.http.get<{message: string, userVaccinationDetails: vaccinationDetails}>(environment.apiUrl+'/api/vaccinationDetails/getVaccinationDetails');
  }

  // method to make HTTP POST request to API to add vaccination details for user
  postVaccinationDetails(  ppsn: string, dateOfBirth: Date, selectedGender: string, nationality: string, addressOne: string, addressTwo: string, city: string, postCode: string, selectedVaccinePreference: string){
    const details: any = {
      ppsn: ppsn,
      dateOfBirth: dateOfBirth,
      selectedGender: selectedGender,
      nationality: nationality,
      addressOne: addressOne,
      addressTwo: addressTwo,
      city: city,
      postCode: postCode,
      selectedVaccinePreference: selectedVaccinePreference,
    }
    return this.http.post<{message: string, userVaccinationDetails: vaccinationDetails}>(environment.apiUrl+"/api/vaccinationDetails/addVaccinationDetails", details);
  }

  // method to make HTTP PUT request to API to update vaccination details for user
  putVaccinationDetails( id: string, ppsn: string, dateOfBirth: Date, selectedGender: string, nationality: string, addressOne: string, addressTwo: string, city: string, postCode: string, selectedVaccinePreference: string){
    const details: any = {
      _id: id,
      ppsn: ppsn,
      dateOfBirth: dateOfBirth,
      selectedGender: selectedGender,
      nationality: nationality,
      addressOne: addressOne,
      addressTwo: addressTwo,
      city: city,
      postCode: postCode,
      selectedVaccinePreference: selectedVaccinePreference,
    }
    return this.http.put(environment.apiUrl+"/api/vaccinationDetails/updateVaccinationDetails", details);
  }
}
