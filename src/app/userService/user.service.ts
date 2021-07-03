import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token;

  constructor(private http: HttpClient) { }

  getToken(){
    return this.token;
  }

  postUser(user: user){
    const requestDetails: user = user;
    this.http.post("http://localhost:3000/api/users/createUser", requestDetails).subscribe((responseData) => {
      console.log(responseData);
    });
  }

  loginUser(email: string, password: string){
    const requestDetails: any = {email: email, password: password};
    this.http.post<{token: string}>("http://localhost:3000/api/users/login", requestDetails).subscribe((responseData) => {
      const token = responseData.token;
      this.token = token;
    });
  }

}
