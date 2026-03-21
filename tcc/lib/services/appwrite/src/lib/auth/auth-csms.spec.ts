import { TestBed } from '@angular/core/testing';

import { AuthCsms } from './auth-csms';

describe('AuthCsms', () => {
  let service: AuthCsms;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCsms);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
