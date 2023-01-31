import { TestBed } from '@angular/core/testing';

import { JsonDService } from './json-d.service';

describe('JsonDService', () => {
  let service: JsonDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
