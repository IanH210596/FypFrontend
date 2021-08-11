import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {catchError} from "rxjs/operators";
import { throwError } from "rxjs";
import { ErrorComponent } from "./error/error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private dialog: MatDialog){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      // used to intercept any error responses returned by the API for requests from the frontend.
      catchError((error: HttpErrorResponse) => {
        // Default error message
        let errorMessage = "An unknown error occurred!";
        if (error.error.message) {
          // Overwrites error message if message returned in error response
          errorMessage = error.error.message;
        }

        // opens model dialog for the specified ErrorComponent
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(error);

      })
    );
  }
}
