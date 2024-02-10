import { TestBed } from '@angular/core/testing';

import { GetRoomService } from './get-room.service';

describe('GetRoomService', () => {
  let service: GetRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
