import { TestBed } from '@angular/core/testing';

import { VaxDetailsService } from './vax-details.service';

describe('VaxDetailsService', () => {
  let service: VaxDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaxDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
