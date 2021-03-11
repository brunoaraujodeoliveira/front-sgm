import { TestBed } from '@angular/core/testing';

import { LifeSecurityService } from './life-security.service';

describe('LifeSecurityService', () => {
  let service: LifeSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
