import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaxDetailsComponent } from './vax-details.component';

describe('VaxDetailsComponent', () => {
  let component: VaxDetailsComponent;
  let fixture: ComponentFixture<VaxDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaxDetailsComponent ]
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
