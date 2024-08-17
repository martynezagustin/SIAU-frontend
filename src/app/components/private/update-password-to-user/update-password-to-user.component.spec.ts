import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordToUserComponent } from './update-password-to-user.component';

describe('UpdatePasswordToUserComponent', () => {
  let component: UpdatePasswordToUserComponent;
  let fixture: ComponentFixture<UpdatePasswordToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePasswordToUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
