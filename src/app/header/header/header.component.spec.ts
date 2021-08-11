import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { UserService } from 'src/app/userService/user.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [AppModule, AppRoutingModule],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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

  it('should call onLogout() method upon click of Logout Button', () => {
    spyOn(component, 'onLogout');

    let debugElementLogoutBtn= fixture.debugElement.query(By.css('[id=logoutBtn]'));
    debugElementLogoutBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onLogout).toHaveBeenCalled();
    });
  });

});
