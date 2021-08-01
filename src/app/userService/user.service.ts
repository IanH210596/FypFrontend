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
  // public loggedIn: boolean = false;

  constructor(private http: HttpClient, protected router: Router) { }

  getToken(){
    return this.token;
  }

  getLoginStatus(){
    return this.isLoggedIn;
  }

  getLoggedInListener(){
    return this.loggedInListener.asObservable();
  }

  getRegisteredUserListener(){
    return this.registeredUserListener.asObservable();
  }

  postUser(user: user){
    const requestDetails: user = user;
    this.http.post(environment.apiUrl+"/api/users/createUser", requestDetails, {observe: 'response'}).subscribe((responseData) => {
      if(responseData.status == 201){
        this.registeredUserListener.next(true);
      }
    });
  }

  loginUser(email: string, password: string){
    const requestDetails: any = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>(environment.apiUrl+"/api/users/login", requestDetails, {observe: 'response'}).subscribe((responseData) => {
      const token = responseData.body.token;
      this.token = token;
      if(responseData.status == 200){
        const expiresInDuration = responseData.body.expiresIn;

        this.setTokenTimer(expiresInDuration);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + (expiresInDuration * 1000));
        this.saveToken(token, expirationDate);

        this.isLoggedIn = true;
        this.loggedInListener.next(true);

        this.router.navigate(['/vaccinationDetails']);
      }
    })
  };

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

  private setTokenTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveToken(token: string, expirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

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


  // loginUser(email: string, password: string){
  //   const requestDetails: any = {email: email, password: password};
  //   return this.http.post<{token: string}>("http://localhost:3000/api/users/login", requestDetails, {observe: 'response'}).toPromise().then(responseData =>{
  //     const token = responseData.body.token;
  //     this.token = token;
  //     if( responseData.status == 200){
  //       this.loggedIn = true;
  //     }
  //   });

}
