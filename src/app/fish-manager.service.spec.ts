import { TestBed } from '@angular/core/testing';

import { FishManagerService } from './fish-manager.service';

describe('FishManagerService', () => {
  let service: FishManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
