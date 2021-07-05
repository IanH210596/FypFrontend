import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isLoggedIn = this.userService.getLoginStatus();
    if (!isLoggedIn) {
      this.router.navigate(["/login"]);
      console.log("Redirecting to Login Page");
    }
    return isLoggedIn;
  }

}
