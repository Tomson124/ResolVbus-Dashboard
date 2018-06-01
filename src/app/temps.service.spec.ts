import { TestBed, inject } from '@angular/core/testing';

import { TempsService } from './temps.service';
import { HttpClientModule } from '@angular/common/http';

describe('TempsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TempsService]
    });
  });

  it('should be created', inject([TempsService], (service: TempsService) => {
    expect(service).toBeTruthy();
  }));
});
