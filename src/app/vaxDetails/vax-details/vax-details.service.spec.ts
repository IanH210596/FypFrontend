import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { VaxDetailsService } from './vax-details.service';

describe('VaxDetailsService', () => {
  let service: VaxDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [HttpClient]
    });
    service = TestBed.inject(VaxDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
