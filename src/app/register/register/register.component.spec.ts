import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { UserService } from 'src/app/userService/user.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let testEmail: string;
  let testPassword: string;
  let testFirstName: string;
  let testLastName: string;
  let testMobile: string;
  let testInvalidEmail: string;
  let registerForm: NgForm;

  beforeAll(() => {
    // constants assigned data for testing purposes
    const username = 'testUsername';
    const domain = 'testDomain';
    const password = 'testPassword';
    const firstName = 'testFirstName';
    const lastName = 'testLastName';
    const mobile = '0833851234';
    const email = `${username}@${domain}.com`;
    const form = <NgForm>{
      value: {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        password: password
      }
    }
    // Declared test data variables given values
    testEmail = email;
    testPassword = password;
    testFirstName = firstName;
    testLastName = lastName;
    testMobile = mobile;
    testInvalidEmail = `${username}${domain}.com`;
    registerForm = form;

  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [AppModule],
      providers: [FormBuilder, UserService, NgForm]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should initiate the firstname field as empty', () => {
    let debugElementFirstName = fixture.debugElement.query(By.css('[name=firstName]'));
    let elFirstName = debugElementFirstName.nativeElement;
    // expect the firstname input to be empty by default on loading
    expect(elFirstName.value).toBe('');
  });

  //-------------------------------------------------------------------------------
  //Test Case 03
  //-------------------------------------------------------------------------------

  it('should initiate the lastname field as empty', () => {
    let debugElementLastName = fixture.debugElement.query(By.css('[name=lastName]'));
    let elLastName = debugElementLastName.nativeElement;
    // expect the lastname input to be empty by default on loading
    expect(elLastName.value).toBe('');
  });

  //-------------------------------------------------------------------------------
  //Test Case 04
  //-------------------------------------------------------------------------------

  it('should initiate the mobile field as empty', () => {
    let debugElementMobile = fixture.debugElement.query(By.css('[name=mobile]'));
    let elMobile = debugElementMobile.nativeElement;
    // expect the mobile input to be empty by default on loading
    expect(elMobile.value).toBe('');
  });

  //-------------------------------------------------------------------------------
  //Test Case 05
  //-------------------------------------------------------------------------------

  it('should initiate the email field as empty', () => {
    let debugElementEmail = fixture.debugElement.query(By.css('[name=email]'));
    let elEmail = debugElementEmail.nativeElement;
    // expect the email input to be empty by default on loading
    expect(elEmail.value).toBe('');
  });


  //-------------------------------------------------------------------------------
  //Test Case 06
  //-------------------------------------------------------------------------------

  it('should initiate the password field as empty', () => {
    let debugElementPassword = fixture.debugElement.query(By.css('[name=password]'));
    let elPassword = debugElementPassword.nativeElement;
    // expect the password input to be empty by default on loading
    expect(elPassword.value).toBe('');
  });

  //-------------------------------------------------------------------------------
  //Test Case 07
  //-------------------------------------------------------------------------------

  it('should display an error when a registration attempt is made with empty inputs', () => {
    fixture.whenStable().then(() => {
      // similar to in login.component.spec.ts, expect errors to be displayed when all inputs have not been provided
      // before register button is clicked
      let debugElementRegister = fixture.debugElement.query(By.css('#register'));
      debugElementRegister.triggerEventHandler('click', null);
      fixture.detectChanges();

      let debugFirstNameElementError = fixture.debugElement.query(By.css('#firstNameError'));
      let elFirstNameError:HTMLElement = debugFirstNameElementError.nativeElement;

      let debugLastNameElementError = fixture.debugElement.query(By.css('#lastNameError'));
      let elLastNameError:HTMLElement = debugLastNameElementError.nativeElement;

      let debugMobileElementError = fixture.debugElement.query(By.css('#mobileError'));
      let elMobileError:HTMLElement = debugMobileElementError.nativeElement;

      let debugEmailElementError = fixture.debugElement.query(By.css('#emailError'));
      let elEmailError:HTMLElement = debugEmailElementError.nativeElement;

      let debugPasswordElementError = fixture.debugElement.query(By.css('#passwordError'));
      let elPasswordError:HTMLElement = debugPasswordElementError.nativeElement;

      expect(elFirstNameError.innerText).toBe('Please enter a First Name.');
      expect(elLastNameError.innerText).toBe('Please enter a Last Name.');
      expect(elMobileError.innerText).toBe('Please enter a Mobile Number.');
      expect(elEmailError.innerText).toBe('Please enter a valid Email.');
      expect(elPasswordError.innerText).toBe('Please enter a Password.');

      //-------------------------------------------------------------------------------

      let debugElementFirstName = fixture.debugElement.query(By.css('[name=firstname]'));
      let elFirstName = debugElementFirstName.nativeElement;
      elFirstName.value = testFirstName;
      elFirstName.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      debugElementRegister.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(elFirstNameError.innerText).toBeFalsy();
      expect(elLastNameError.innerText).toBe('Please enter a Last Name.');
      expect(elMobileError.innerText).toBe('Please enter a Mobile Number.');
      expect(elEmailError.innerText).toBe('Please enter a valid Email.');
      expect(elPasswordError.innerText).toBe('Please enter a Password.');

      //-------------------------------------------------------------------------------

      let debugElementLastName = fixture.debugElement.query(By.css('[name=lastname]'));
      let elLastName = debugElementLastName.nativeElement;
      elLastName.value = testLastName;
      elLastName.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      debugElementRegister.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(elFirstNameError.innerText).toBe('Please enter a First Name.');
      expect(elLastNameError).toBeFalsy();
      expect(elMobileError.innerText).toBe('Please enter a Mobile Number.');
      expect(elEmailError.innerText).toBe('Please enter a valid Email.');
      expect(elPasswordError.innerText).toBe('Please enter a Password.');

      //-------------------------------------------------------------------------------

      let debugElementMobile = fixture.debugElement.query(By.css('[name=mobile]'));
      let elMobile = debugElementMobile.nativeElement;
      elMobile.value = testMobile;
      elMobile.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      debugElementRegister.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(elFirstNameError.innerText).toBe('Please enter a First Name.');
      expect(elLastNameError.innerText).toBe('Please enter a Last Name.');
      expect(elMobileError).toBeFalsy();
      expect(elEmailError.innerText).toBe('Please enter a valid Email.');
      expect(elPasswordError.innerText).toBe('Please enter a Password.');

      //-------------------------------------------------------------------------------

      let debugElementEmail = fixture.debugElement.query(By.css('[name=email]'));
      let elEmail = debugElementEmail.nativeElement;
      elEmail.value = testEmail;
      elEmail.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      debugElementRegister.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(elFirstNameError.innerText).toBe('Please enter a First Name.');
      expect(elLastNameError.innerText).toBe('Please enter a Last Name.');
      expect(elMobileError.innerText).toBe('Please enter a Mobile Number.');
      expect(elEmailError).toBeFalsy();
      expect(elPasswordError.innerText).toBe('Please enter a Password.');

      //-------------------------------------------------------------------------------

      let debugElementPassword = fixture.debugElement.query(By.css('[name=password]'));
      let elPassword = debugElementPassword.nativeElement;
      elPassword.value = testPassword;
      elPassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      debugElementRegister.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(elFirstNameError.innerText).toBe('Please enter a First Name.');
      expect(elLastNameError.innerText).toBe('Please enter a Last Name.');
      expect(elMobileError.innerText).toBe('Please enter a Mobile Number.');
      expect(elEmailError.innerText).toBe('Please enter a valid Email.');
      expect(elPasswordError).toBeFalsy();

    });
  });

  //-------------------------------------------------------------------------------
  //Test Case 08
  //-------------------------------------------------------------------------------

  it('should display an error when an invalid email is entered', () => {
    fixture.whenStable().then(() => {
      let debugElementRegister = fixture.debugElement.query(By.css('#register'));

      let debugFirstNameElementError = fixture.debugElement.query(By.css('#firstNameError'));
      let elFirstNameError:HTMLElement = debugFirstNameElementError.nativeElement;

      let debugLastNameElementError = fixture.debugElement.query(By.css('#lastNameError'));
      let elLastNameError:HTMLElement = debugLastNameElementError.nativeElement;

      let debugMobileElementError = fixture.debugElement.query(By.css('#mobileError'));
      let elMobileError:HTMLElement = debugMobileElementError.nativeElement;

      let debugEmailElementError = fixture.debugElement.query(By.css('#emailError'));
      let elEmailError:HTMLElement = debugEmailElementError.nativeElement;

      let debugPasswordElementError = fixture.debugElement.query(By.css('#passwordError'));
      let elPasswordError:HTMLElement = debugPasswordElementError.nativeElement;

      //-------------------------------------------------------------------------------

      let debugElementFirstName = fixture.debugElement.query(By.css('[name=firstname]'));
      let elFirstName = debugElementFirstName.nativeElement;
      elFirstName.value = testFirstName;
      elFirstName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      //-------------------------------------------------------------------------------

      let debugElementLastName = fixture.debugElement.query(By.css('[name=lastname]'));
      let elLastName = debugElementLastName.nativeElement;
      elLastName.value = testLastName;
      elLastName.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      //-------------------------------------------------------------------------------

      let debugElementMobile = fixture.debugElement.query(By.css('[name=mobile]'));
      let elMobile = debugElementMobile.nativeElement;
      elMobile.value = testMobile;
      elMobile.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      //-------------------------------------------------------------------------------

      let debugElementEmail = fixture.debugElement.query(By.css('[name=email]'));
      let elEmail = debugElementEmail.nativeElement;
      elEmail.value = testInvalidEmail;
      elEmail.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      //-------------------------------------------------------------------------------

      let debugElementPassword = fixture.debugElement.query(By.css('[name=password]'));
      let elPassword = debugElementPassword.nativeElement;
      elPassword.value = testPassword;
      elPassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      debugElementRegister.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(elFirstNameError).toBeFalsy();
      expect(elLastNameError).toBeFalsy();
      expect(elMobileError).toBeFalsy();
      expect(elEmailError.innerText).toBe('Please enter a valid Email.');
      expect(elPasswordError).toBeFalsy();

    });
  });

  //-------------------------------------------------------------------------------
  //Test Case 09
  //-------------------------------------------------------------------------------

  // it('should return true for userRegistered and userIsLoggedIn after executing register()', () => {
  //   fixture.whenStable().then(() => {
  //     component.register(registerForm);
  //     fixture.detectChanges();
  //     console.log(component.userRegistered);
  //     expect(component.userRegistered).toBeTrue();
  //     expect(component.userIsLoggedIn).toBeTrue();
  //   });
  // });
});
