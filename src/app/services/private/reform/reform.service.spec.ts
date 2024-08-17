import { TestBed } from '@angular/core/testing';

import { ReformService } from './reform.service';

describe('ReformService', () => {
  let service: ReformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
