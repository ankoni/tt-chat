import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChannelUserDialogComponent } from './add-channel-user-dialog.component';

describe('AddChannelUserDialogComponent', () => {
  let component: AddChannelUserDialogComponent;
  let fixture: ComponentFixture<AddChannelUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChannelUserDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChannelUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
