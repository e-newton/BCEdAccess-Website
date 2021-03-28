import { TestBed } from '@angular/core/testing';

import { PullOutStyleService } from './pull-out-style.service';

describe('PullOutStyleService', () => {
  let service: PullOutStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PullOutStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
