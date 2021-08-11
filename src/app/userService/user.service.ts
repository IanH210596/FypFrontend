import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token;
  private loggedInListener = new Subject<boolean>();
  private registeredUserListener = new Subject<boolean>();
  private isLoggedIn = false;
  private tokenTimer: any;

  constructor(private http: HttpClient, protected router: Router) { }

  //method to return the user's token
  getToken(){
    return this.token;
  }

  // method to return if the user is logged in (true) or not (false)
  getLoginStatus(){
    return this.isLoggedIn;
  }

  // method to return observable for user's login status
  getLoggedInListener(){
    return this.loggedInListener.asObservable();
  }

  // method to return observable for user's registration status
  getRegisteredUserListener(){
    return this.registeredUserListener.asObservable();
  }

  // method to make HTTP POST request to API to create newly registered user
  postUser(user: user){
    const requestDetails: user = user;
    this.http.post(environment.apiUrl+"/api/users/createUser", requestDetails, {observe: 'response'}).subscribe((responseData) => {
      if(responseData.status == 201){
        // if user successfully created, then registeredUserListener Subject is updated to true
        this.registeredUserListener.next(true);
      }
    });
  }


  // method to make HTTP POST request to API to login registered user
  loginUser(email: string, password: string){
    const requestDetails: any = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>(environment.apiUrl+"/api/users/login", requestDetails, {observe: 'response'}).subscribe((responseData) => {
      const token = responseData.body.token;
      this.token = token;
      if(responseData.status == 200){
        const expiresInDuration = responseData.body.expiresIn;

        // token timeout set based on the token expiresIn time duration in response from API server
        this.setTokenTimer(expiresInDuration);

        const now = new Date();
        //token and its expiration date saved
        const expirationDate = new Date(now.getTime() + (expiresInDuration * 1000));
        this.saveToken(token, expirationDate);

        // if user successfully logged in, then loggedInListener Subject is updated to true
        this.isLoggedIn = true;
        this.loggedInListener.next(true);

        // if user successfully logged in, then they are navigated to the Vaccination Details Component
        this.router.navigate(['/vaccinationDetails']);
      }
    })
  };

  // method to retrieve token from local storage if available and if it hasn't expired then token timer set and user logged in
  autoAuthUser(){
    const tokenData = this.getTokenFromLocal();
    if(!tokenData){
      return;
    }
    const now = new Date();
    const expiresIn = tokenData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0 ) {
      this.token = tokenData.token;
      this.isLoggedIn = true;
      this.setTokenTimer(expiresIn / 1000);
      this.loggedInListener.next(true);
    }
  }

  // method to logout user, clearing token from local storage, clearing timeout, setting loggedInListener to false and navigating user to logout screen
  logout() {
    this.token = null;
    this.isLoggedIn = false;
    this.loggedInListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/logout']);
    this.clearToken();
    if(!this.isLoggedIn){
      console.log("Logged Out");
      console.log(this.token)
    }
  };

  // method for setting the timeout for the token, and logged out the user when the timeout is exceeded
  private setTokenTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // method to save token and its expiration date to local storage
  private saveToken(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  // method to clear token and its expiration date from local storage
  private clearToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  // method to get token and its expiration date from local storage
  private getTokenFromLocal(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

}
