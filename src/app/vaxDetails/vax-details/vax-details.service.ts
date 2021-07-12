import { Injectable } from '@angular/core';
import { vaccinationDetails } from './vax-details.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaxDetailsService {
  private vaccinationDetails: vaccinationDetails;

  constructor(private http: HttpClient) { }

  getVaccinationDetails(){
    return this.vaccinationDetails;
  }

  postVaccinationDetails(vaccinationDetails: vaccinationDetails){
    const details: vaccinationDetails = vaccinationDetails;
    this.vaccinationDetails = details;
    this.http.post(environment.apiUrl+"/api/vaccinationDetails/addVaccinationDetails", details).subscribe((responseData) => {
      console.log(responseData);
    });
  }
}
