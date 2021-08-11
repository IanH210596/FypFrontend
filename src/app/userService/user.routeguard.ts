import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // gets the user's login status by calling userService getLoginStatus method
    const isLoggedIn = this.userService.getLoginStatus();
    if (!isLoggedIn) {
      // if the user is not logged in and attempts to navigate to a route which is protected by the RouteGuard, then they will be redirected to the LoginComponent
      this.router.navigate(["/login"]);
      console.log("Redirecting to Login Page");
    }
    // if returns true, route can be activated but if returns false, then route cannot be activated
    return isLoggedIn;
  }

}
