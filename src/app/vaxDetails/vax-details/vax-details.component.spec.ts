import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

import { VaxDetailsComponent } from './vax-details.component';
import { VaxDetailsService } from './vax-details.service';

describe('VaxDetailsComponent', () => {
  let component: VaxDetailsComponent;
  let fixture: ComponentFixture<VaxDetailsComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
