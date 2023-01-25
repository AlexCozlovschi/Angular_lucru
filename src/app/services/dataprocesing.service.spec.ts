import { TestBed } from '@angular/core/testing';

import { DataprocesingService } from './dataprocesing.service';

describe('DataprocesingService', () => {
  let service: DataprocesingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataprocesingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
