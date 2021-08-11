import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed} from '@angular/core/testing';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app.routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { user } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let testEmail: string;
  let testPassword: string;
  let testFirstName: string;
  let testLastName: string;
  let testMobile: string;
  let testUser: user;
  let httpTestingController : HttpTestingController;
  let httpClient: HttpClient;

  beforeAll(() => {
    // constants assigned data for testing purposes
    const username = 'testUsernameNew';
    const domain = 'testDomain';
    const password = 'testPassword';
    const firstName = 'testFirstName';
    const lastName = 'testLastName';
    const mobile = '0833851234';
    const email = `${username}@${domain}.com`;
    const user = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      password: password
    }
    // Declared test data variables given values
    testEmail = email;
    testPassword = password;
    testFirstName = firstName;
    testLastName = lastName;
    testMobile = mobile;
    testUser = user;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule, HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //-------------------------------------------------------------------------------
  //Test Cases Start
  //-------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  //Test Case 01
  //-------------------------------------------------------------------------------


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //-------------------------------------------------------------------------------
  //Test Case 02
  //-------------------------------------------------------------------------------


  it('http register request should execute', () => {
    httpClient.post<{message: string}>("http://localhost:3000/api/users/createUser", testUser, {observe: 'response'}).subscribe((responseData) => {
      console.log(responseData);
      expect(responseData.status).toBe(201);
      expect(responseData.body.message).toBe("User Created Successfully")
    });

    const req = httpTestingController.expectOne("http://localhost:3000/api/users/createUser");
    expect(req.request.method).toEqual("POST");
    req.flush({message: "User Created Successfully"}, {status: 201, statusText: "Success"});
    httpTestingController.verify();
  });

  //-------------------------------------------------------------------------------
  //Test Case 03
  //-------------------------------------------------------------------------------


  it('http login request should execute', () => {
    httpClient.post<{token: string, expiresIn: number}>("http://localhost:3000/api/users/login", testUser, {observe: 'response'}).subscribe((responseData) => {
      console.log(responseData);
      expect(responseData.status).toBe(200);
      expect(responseData.body.token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZWhAbGl2ZS5pZSIsInVzZXJJZCI6IjYwZTM3NjYzZjA1YzRhM2VjY2VmYWUzNyIsImlhdCI6MTYyNjAyODAxMiwiZXhwIjoxNjI2MDMxNjEyfQ.Ykk8pYN1vCf2tG_JyJsvA4MbtC_6TIlFT9IHV06tNgQ");
      expect(responseData.body.expiresIn).toBe(3600);
    });

    const req = httpTestingController.expectOne("http://localhost:3000/api/users/login");
    expect(req.request.method).toEqual("POST");
    req.flush({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZWhAbGl2ZS5pZSIsInVzZXJJZCI6IjYwZTM3NjYzZjA1YzRhM2VjY2VmYWUzNyIsImlhdCI6MTYyNjAyODAxMiwiZXhwIjoxNjI2MDMxNjEyfQ.Ykk8pYN1vCf2tG_JyJsvA4MbtC_6TIlFT9IHV06tNgQ", expiresIn: 3600}, {status: 200, statusText: "Success"});
    httpTestingController.verify();
  });


});
