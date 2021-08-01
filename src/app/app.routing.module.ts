import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login/login.component";
import { RegisterComponent } from "./register/register/register.component";
import { RouteGuard } from "./userService/user.routeguard";
import { VaxDetailsComponent } from "./vaxDetails/vax-details/vax-details.component";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "logout", component: LoginComponent},
  {path: "vaccinationDetails", component: VaxDetailsComponent, canActivate: [RouteGuard]},
  {path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule{}

