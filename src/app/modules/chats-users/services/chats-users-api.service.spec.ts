import { TestBed } from '@angular/core/testing';

import { ChatsUsersApiService } from './chats-users-api.service';

describe('ChatsUsersApiService', () => {
  let service: ChatsUsersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsUsersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
