import { TestBed } from '@angular/core/testing';

import { AuthGrpc } from './auth-grpc';

describe('AuthGrpc', () => {
  let service: AuthGrpc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGrpc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
