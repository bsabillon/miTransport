import { TestBed } from '@angular/core/testing';

import { PassengersTripsService } from './passengers-trips.service';

describe('PassengersTripsService', () => {
  let service: PassengersTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengersTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
