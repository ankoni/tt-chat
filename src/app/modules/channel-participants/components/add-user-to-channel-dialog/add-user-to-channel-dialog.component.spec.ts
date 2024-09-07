import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToChannelDialogComponent } from './add-user-to-channel-dialog.component';

describe('AddChannelUserDialogComponent', () => {
  let component: AddUserToChannelDialogComponent;
  let fixture: ComponentFixture<AddUserToChannelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserToChannelDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserToChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
