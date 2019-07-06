import { TestBed } from '@angular/core/testing';

import { GetBugService } from './get-bug.service';

describe('GetBugService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBugService = TestBed.get(GetBugService);
    expect(service).toBeTruthy();
  });
});
