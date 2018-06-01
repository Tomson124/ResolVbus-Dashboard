import { TestBed, inject } from '@angular/core/testing';

import { TempResolver } from './temp-resolver.resolver';
import { HttpClientModule } from '@angular/common/http';

describe('TempResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TempResolver]
    });
  });

  it('should be created', inject([TempResolver], (service: TempResolver) => {
    expect(service).toBeTruthy();
  }));
});
