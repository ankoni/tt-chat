import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelUserListComponent } from './channel-user-list.component';

describe('ChannelUserListComponent', () => {
  let component: ChannelUserListComponent;
  let fixture: ComponentFixture<ChannelUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
