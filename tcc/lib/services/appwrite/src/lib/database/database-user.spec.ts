import { TestBed } from '@angular/core/testing';

import { DatabaseUser } from './database-user';

describe('DatabaseUser', () => {
  let service: DatabaseUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
