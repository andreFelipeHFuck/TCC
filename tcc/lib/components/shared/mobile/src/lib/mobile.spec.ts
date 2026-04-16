import { TestBed } from '@angular/core/testing';

import { Mobile } from './mobile';

describe('Mobile', () => {
  let service: Mobile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mobile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
