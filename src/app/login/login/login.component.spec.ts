import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { UserService } from 'src/app/userService/user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [AppModule, AppRoutingModule, ReactiveFormsModule],
      providers: [FormBuilder, UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // component.form.setValue({
    //   email: '',
    //   password: ''
    // })
  });

  //-------------------------------------------------------------------------------
  //Test Cases Start
  //-------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------
  //Test Case 01
  //-------------------------------------------------------------------------------


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //-------------------------------------------------------------------------------
  //Test Case 02
  //-------------------------------------------------------------------------------

  it('should initiate the email field as empty', () => {
    let debugElementEmail = fixture.debugElement.query(By.css('[id=emailInput]'));
    let elEmail = debugElementEmail.nativeElement;
    // expect the email input to be empty by default on loading
    expect(elEmail.value).toBe('');
  });

  //-------------------------------------------------------------------------------
  //Test Case 03
  //-------------------------------------------------------------------------------

  it('should initiate the password field as empty', () => {
    let debugElementPassword = fixture.debugElement.query(By.css('[id=passwordInput]'));
    let elPassword = debugElementPassword.nativeElement;
    // expect the email input to be empty by default on loading
    expect(elPassword.value).toBe('');
  });

  //-------------------------------------------------------------------------------
  //Test Case 04
  //-------------------------------------------------------------------------------

  // it('should display an error when a login attempt is made with empty email and/or password', () => {
  //   fixture.whenStable().then(() => {

  //     let debugElementLogin = fixture.debugElement.query(By.css('#login'));
  //     debugElementLogin.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     let debugEmailElementError = fixture.debugElement.query(By.css('#emailError'));
  //     let elEmailError:HTMLElement = debugEmailElementError.nativeElement;

  //     let debugPasswordElementError = fixture.debugElement.query(By.css('#passwordError'));
  //     let elPasswordError:HTMLElement = debugPasswordElementError.nativeElement;

  //     // expect error to be displayed when no email and password are provided
  //     expect(elEmailError.innerText).toBe('Please enter a valid Email.');
  //     expect(elPasswordError.innerText).toBe('Please enter a Password.');

  //     //-------------------------------------------------------------------------------

  //     let debugElementEmail = fixture.debugElement.query(By.css('#emailInput'));
  //     let elEmail = debugElementEmail.nativeElement;
  //     // value set for email input, dispatched to the input and change detection cycle triggered
  //     elEmail.value = 'ianh@live.ie';
  //     elEmail.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     debugElementLogin.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     // expect error to be displayed when only email provided
  //     expect(elEmailError.innerText).toBe('Please enter a valid Emailgdsshds.');
  //     console.log(elEmailError.innerText);
  //     expect(elPasswordError.innerText).toBe('Please enter a Password.');

  //     //-------------------------------------------------------------------------------

  //     let debugElementPassword = fixture.debugElement.query(By.css('#passwordInput'));
  //     let elPassword = debugElementPassword.nativeElement;
  //     // value set for password input, dispatched to the input and change detection cycle triggered
  //     elPassword.value = 'Pass1';
  //     elPassword.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     debugElementLogin.triggerEventHandler('click', null);
  //     fixture.detectChanges();


  //     // expect error to be displayed when only email provided
  //     expect(elEmailError.innerText).toBe('Please enter a valid Email.');
  //     expect(elPasswordError.innerText).toBe('Please enter a Password.');
  //   })

  // });


  // -------------------------------------------------------------------------------
  // Test Case 05
  // -------------------------------------------------------------------------------

  // it('should display an error when an invalid email is entered', () => {
  //   fixture.whenStable().then(() => {
  //     let debugElementLogin = fixture.debugElement.query(By.css('#login'));
  //     let debugElementEmail = fixture.debugElement.query(By.css('#emailInput'));
  //     let elEmail = debugElementEmail.nativeElement;
  //     // value set for Email input with invalid email (missing @), dispatched to the input and change detection cycle triggered
  //     elEmail.value = '10540598mydbs.ie';
  //     elEmail.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     let debugElementPassword = fixture.debugElement.query(By.css('#passwordInput'));
  //     let elPassword = debugElementPassword.nativeElement;
  //         // value set for password input, dispatched to the input and change detection cycle triggered
  //     elPassword.value = 'Password1';
  //     elPassword.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     // login button clicked
  //     debugElementLogin.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     let debugEmailElementError = fixture.debugElement.query(By.css('#emailError'));
  //     let elEmailError:HTMLElement = debugEmailElementError.nativeElement;

  //     // expect error to be displayed when only invalid email provided
  //     expect(elEmailError.innerText).toBe('Please enter a valid Email.');
  //   })
  // });

  //-------------------------------------------------------------------------------
  //Test Case 06
  //-------------------------------------------------------------------------------

  // it('should call login() method upon click of Login Button', () => {
  //   fixture.whenStable().then(() => {
  //     spyOn(component,'login');
  //     let debugElementEmail = fixture.debugElement.query(By.css('#emailInput'));
  //     let elEmail = debugElementEmail.nativeElement;
  //     // value for Email input
  //     elEmail.value = 'ianh@live.ie';

  //     let debugElementPassword = fixture.debugElement.query(By.css('#passwordInput'));
  //     let elPassword = debugElementPassword.nativeElement;
  //     // value for Password input
  //     elPassword.value = 'Pass1';

  //     // values dispatched to the input and change detection cycle triggered
  //     elEmail.dispatchEvent(new Event('input'));
  //     elPassword.dispatchEvent(new Event('input'));

  //     let debugElementLoginForm = fixture.debugElement.query(By.css('form'));
  //     debugElementLoginForm.triggerEventHandler('submit', null);
  //     fixture.detectChanges();
  //     expect(component.login).toHaveBeenCalled();
  //   });
  // });

  //-------------------------------------------------------------------------------
  //Test Cases End
  //-------------------------------------------------------------------------------

});
