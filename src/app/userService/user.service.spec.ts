import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app.routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { LoginComponent } from '../login/login/login.component';
import { VaxDetailsComponent } from '../vaxDetails/vax-details/vax-details.component';
import { RouteGuard } from './user.routeguard';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule, RouterTestingModule],
      // providers: [HttpClient, Router, Subject]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
