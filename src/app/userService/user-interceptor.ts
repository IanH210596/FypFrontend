import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";

@Injectable()
export class UserInterceptor implements HttpInterceptor{
  constructor(private userService: UserService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const userToken = this.userService.getToken();
    // used to intercept outgoing HTTP requests, clone them and append an Authorization header with the user's valid token
    // that was returned by the API server when they logged in.
    const userRequest = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + userToken),
    });
    return next.handle(userRequest);
  }
}
