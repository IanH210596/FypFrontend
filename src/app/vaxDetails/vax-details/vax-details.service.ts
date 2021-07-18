import { Injectable } from '@angular/core';
import { vaccinationDetails } from './vax-details.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaxDetailsService {
  // private vaccinationDetails: vaccinationDetails;

  constructor(private http: HttpClient) { }

  getVaccinationDetails(){
      return this.http.get<{message: string, userVaccinationDetails: vaccinationDetails}>(environment.apiUrl+'/api/vaccinationDetails/getVaccinationDetails');
  }

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
    // this.vaccinationDetails = details;
    return this.http.post<{message: string, userVaccinationDetails: vaccinationDetails}>(environment.apiUrl+"/api/vaccinationDetails/addVaccinationDetails", details);
  }

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
    this.http.put(environment.apiUrl+"/api/vaccinationDetails//updateVaccinationDetails", details).subscribe((responseData) => {
      console.log(responseData);
    });

  }
}
