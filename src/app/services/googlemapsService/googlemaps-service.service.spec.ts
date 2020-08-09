import { TestBed } from '@angular/core/testing';

import { GooglemapsServiceService } from './googlemaps-service.service';

describe('GooglemapsServiceService', () => {
  let service: GooglemapsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GooglemapsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
