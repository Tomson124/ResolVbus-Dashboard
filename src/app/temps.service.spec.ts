import { TestBed, inject } from '@angular/core/testing';

import { TempsService } from './temps.service';

describe('TempsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TempsService]
    });
  });

  it('should be created', inject([TempsService], (service: TempsService) => {
    expect(service).toBeTruthy();
  }));
});
