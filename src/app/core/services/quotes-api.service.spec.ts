import { TestBed } from '@angular/core/testing';

import { QuotesApiService } from './quotes-api.service';

describe('QuotesApiService', () => {
  let service: QuotesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
