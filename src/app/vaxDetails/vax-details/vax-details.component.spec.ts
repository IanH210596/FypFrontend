import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { VaxDetailsComponent } from './vax-details.component';
import { VaxDetailsService } from './vax-details.service';

describe('VaxDetailsComponent', () => {
  let component: VaxDetailsComponent;
  let fixture: ComponentFixture<VaxDetailsComponent>;
  let testPpsn: string;
  let testDateOfBirth: Date;
  let testGender: string;
  let testNationality: string;
  let testAddressOne: string;
  let testAddressTwo: string;
  let testCity: string;
  let testPostCode: string;
  let testVaccinePref: string;

  beforeAll(() => {
    // constants assigned data for testing purposes
    const ppsn = 'testPpsn';
    const dateOfBirth = new Date('01-01-1996');
    const gender = 'testGender';
    const nationality = 'testNationality';
    const addressOne = 'testAddressOne';
    const addressTwo = 'testAddressTwo';
    const city = 'testCity';
    const postCode = 'testPostCode';
    const vaccinePref = 'testVaccinePref';

    // Declared test data variables given values
    testPpsn = ppsn;
    testDateOfBirth = dateOfBirth;
    testGender = gender;
    testNationality = nationality;
    testAddressOne = addressOne;
    testAddressTwo = addressTwo;
    testCity = city;
    testPostCode = postCode;
    testVaccinePref = vaccinePref;

  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaxDetailsComponent ],
      imports: [AppModule],
      providers: [FormBuilder, VaxDetailsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaxDetailsComponent);
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

  // //-------------------------------------------------------------------------------
  // //Test Case 02
  // //-------------------------------------------------------------------------------

  // it('should initiate the ppsn field as empty', () => {
  //   let debugElementPpsn = fixture.debugElement.query(By.css('[name=ppsn]'));
  //   let elPpsn = debugElementPpsn.nativeElement;
  //   // expect the firstname input to be empty by default on loading
  //   expect(elPpsn.value).toBe('');
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 03
  // //-------------------------------------------------------------------------------

  // it('should initiate the date of birth field as empty', () => {
  //   let debugElementDateOfBirth = fixture.debugElement.query(By.css('[name=dateOfBirth]'));
  //   let elDateOfBirth = debugElementDateOfBirth.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elDateOfBirth.value).toBe('');
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 04
  // //-------------------------------------------------------------------------------

  // it('should initiate the selected gender field as empty', () => {
  //   let debugSelectedGender = fixture.debugElement.query(By.css('[name=gender]'));
  //   let elSelectedGender = debugSelectedGender.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elSelectedGender.value).toBeUndefined();
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 05
  // //-------------------------------------------------------------------------------

  // it('should initiate the nationality field as empty', () => {
  //   let debugElementNationality = fixture.debugElement.query(By.css('[name=nationality]'));
  //   let elNationality = debugElementNationality.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elNationality.value).toBe('');
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 06
  // //-------------------------------------------------------------------------------

  // it('should initiate the addressOne field as empty', () => {
  //   let debugElementAddressOne = fixture.debugElement.query(By.css('[name=addressOne]'));
  //   let elAddressOne = debugElementAddressOne.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elAddressOne.value).toBe('');
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 07
  // //-------------------------------------------------------------------------------

  // it('should initiate the addressTwo field as empty', () => {
  //   let debugElementAddressTwo = fixture.debugElement.query(By.css('[name=addressTwo]'));
  //   let elAddressTwo = debugElementAddressTwo.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elAddressTwo.value).toBe('');
  // });


  // //-------------------------------------------------------------------------------
  // //Test Case 08
  // //-------------------------------------------------------------------------------

  // it('should initiate the city field as empty', () => {
  //   let debugElementCity = fixture.debugElement.query(By.css('[name=city]'));
  //   let elCity = debugElementCity.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elCity.value).toBe('');
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 09
  // //-------------------------------------------------------------------------------

  // it('should initiate the postcode field as empty', () => {
  //   let debugElementPostcode = fixture.debugElement.query(By.css('[name=postCode]'));
  //   let elPostCode = debugElementPostcode.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elPostCode.value).toBe('');
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 10
  // //-------------------------------------------------------------------------------

  // it('should initiate the selected vaccine preference field as empty', () => {
  //   let debugSelectedVaccinePreference = fixture.debugElement.query(By.css('[name=vaccinePreference]'));
  //   let elSelectedVaccinePreference = debugSelectedVaccinePreference.nativeElement;
  //   // expect the lastname input to be empty by default on loading
  //   expect(elSelectedVaccinePreference.value).toBeUndefined();
  // });

  // //-------------------------------------------------------------------------------
  // //Test Case 11
  // //-------------------------------------------------------------------------------

  // it('should display an error when a registration attempt is made with empty inputs', () => {
  //   fixture.whenStable().then(() => {
  //     let debugElementSave = fixture.debugElement.query(By.css('#save'));
  //     debugElementSave.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     let debugPpsnementError = fixture.debugElement.query(By.css('#ppsnError'));
  //     let elPpsnError:HTMLElement = debugPpsnementError.nativeElement;

  //     let debugDateOfBirthElementError = fixture.debugElement.query(By.css('#dateOfBirthError'));
  //     let elDateOfBirthError:HTMLElement = debugDateOfBirthElementError.nativeElement;

  //     let debugGenderElementError = fixture.debugElement.query(By.css('#genderError'));
  //     let elGenderError:HTMLElement = debugGenderElementError.nativeElement;

  //     let debugNationalityElementError = fixture.debugElement.query(By.css('#nationalityError'));
  //     let elNationalityError:HTMLElement = debugNationalityElementError.nativeElement;

  //     let debugAddressOneElementError = fixture.debugElement.query(By.css('#addressOneError'));
  //     let elAddressOneError:HTMLElement = debugAddressOneElementError.nativeElement;

  //     let debugAddressTwoElementError = fixture.debugElement.query(By.css('#addressTwoError'));
  //     let elAddressTwoError:HTMLElement = debugAddressTwoElementError.nativeElement;

  //     let debugCityElementError = fixture.debugElement.query(By.css('#cityError'));
  //     let elCityError:HTMLElement = debugCityElementError.nativeElement;

  //     let debugPostCodeElementError = fixture.debugElement.query(By.css('#postCodeError'));
  //     let elPostCodeError:HTMLElement = debugPostCodeElementError.nativeElement;

  //     let debugVaccinePreferenceElementError = fixture.debugElement.query(By.css('#vaccinePreferenceError'));
  //     let elVaccinePreferenceError:HTMLElement = debugVaccinePreferenceElementError.nativeElement;


  //     expect(elPpsnError.innerText).toBe('Please enter a PPSN.');
  //     expect(elDateOfBirthError.innerText).toBe('Please enter a Date of Birth.');
  //     expect(elGenderError.innerText).toBe('Please select a Gender.');
  //     expect(elNationalityError.innerText).toBe('Please enter a Nationality.');
  //     expect(elAddressOneError.innerText).toBe('Please enter an Address 1.');
  //     expect(elAddressTwoError.innerText).toBe('Please enter an Address 2.');
  //     expect(elCityError.innerText).toBe('Please enter a City.');
  //     expect(elPostCodeError.innerText).toBe('Please enter a Post Code.');
  //     expect(elVaccinePreferenceError.innerText).toBe('Please enter a Vaccine Preference.');

  //     //-------------------------------------------------------------------------------

  //     let debugElementPpsn = fixture.debugElement.query(By.css('[name=ppsn]'));
  //     let elPpsn = debugElementPpsn.nativeElement;
  //     elPpsn.value = testPpsn;
  //     elPpsn.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     debugElementSave.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     expect(elPpsnError).toBeFalsy();
  //     expect(elDateOfBirthError.innerText).toBe('Please enter a Date of Birth.');
  //     expect(elGenderError.innerText).toBe('Please select a Gender.');
  //     expect(elNationalityError.innerText).toBe('Please enter a Nationality.');
  //     expect(elAddressOneError.innerText).toBe('Please enter an Address 1.');
  //     expect(elAddressTwoError.innerText).toBe('Please enter an Address 2.');
  //     expect(elCityError.innerText).toBe('Please enter a City.');
  //     expect(elPostCodeError.innerText).toBe('Please enter a Post Code.');
  //     expect(elVaccinePreferenceError.innerText).toBe('Please enter a Vaccine Preference.');

  //     //-------------------------------------------------------------------------------

  //     let debugElementDateOfBirth = fixture.debugElement.query(By.css('[name=dateOfBirth]'));
  //     let elDateOfBirth = debugElementDateOfBirth.nativeElement;
  //     elDateOfBirth.value = testDateOfBirth;
  //     elDateOfBirth.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     debugElementSave.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     expect(elPpsnError.innerText).toBe('Please enter a PPSN.');
  //     expect(elDateOfBirthError).toBeFalsy();
  //     expect(elGenderError.innerText).toBe('Please select a Gender.');
  //     expect(elNationalityError.innerText).toBe('Please enter a Nationality.');
  //     expect(elAddressOneError.innerText).toBe('Please enter an Address 1.');
  //     expect(elAddressTwoError.innerText).toBe('Please enter an Address 2.');
  //     expect(elCityError.innerText).toBe('Please enter a City.');
  //     expect(elPostCodeError.innerText).toBe('Please enter a Post Code.');
  //     expect(elVaccinePreferenceError.innerText).toBe('Please enter a Vaccine Preference.');

  //     //-------------------------------------------------------------------------------

  //     let debugSelectedGender = fixture.debugElement.query(By.css('[name=gender]'));
  //     let elSelectedGender = debugSelectedGender.nativeElement;
  //     elSelectedGender.value = testGender;
  //     elSelectedGender.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     debugElementSave.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     expect(elPpsnError.innerText).toBe('Please enter a PPSN.');
  //     expect(elDateOfBirthError.innerText).toBe('Please enter a Date of Birth.');
  //     expect(elGenderError).toBeFalsy();
  //     expect(elNationalityError.innerText).toBe('Please enter a Nationality.');
  //     expect(elAddressOneError.innerText).toBe('Please enter an Address 1.');
  //     expect(elAddressTwoError.innerText).toBe('Please enter an Address 2.');
  //     expect(elCityError.innerText).toBe('Please enter a City.');
  //     expect(elPostCodeError.innerText).toBe('Please enter a Post Code.');
  //     expect(elVaccinePreferenceError.innerText).toBe('Please enter a Vaccine Preference.');

  //     //-------------------------------------------------------------------------------

  //     let debugElementNationality = fixture.debugElement.query(By.css('[name=nationality]'));
  //     let elNationality = debugElementNationality.nativeElement;
  //     elNationality.value = testNationality;
  //     elNationality.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     debugElementSave.triggerEventHandler('click', null);
  //     fixture.detectChanges();

  //     expect(elPpsnError.innerText).toBe('Please enter a PPSN.');
  //     expect(elDateOfBirthError.innerText).toBe('Please enter a Date of Birth.');
  //     expect(elGenderError.innerText).toBe('Please select a Gender.');
  //     expect(elNationalityError).toBeFalsy();
  //     expect(elAddressOneError.innerText).toBe('Please enter an Address 1.');
  //     expect(elAddressTwoError.innerText).toBe('Please enter an Address 2.');
  //     expect(elCityError.innerText).toBe('Please enter a City.');
  //     expect(elPostCodeError.innerText).toBe('Please enter a Post Code.');
  //     expect(elVaccinePreferenceError.innerText).toBe('Please enter a Vaccine Preference.');


  //   });
  // });



});
