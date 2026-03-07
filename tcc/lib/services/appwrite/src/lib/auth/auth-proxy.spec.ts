import { TestBed } from '@angular/core/testing';

import { AuthProxy } from './auth-proxy';

describe('AuthProxy', () => {
  let service: AuthProxy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthProxy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
