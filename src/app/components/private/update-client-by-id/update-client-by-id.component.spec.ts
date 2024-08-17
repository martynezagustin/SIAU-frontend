import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientByIdComponent } from './update-client-by-id.component';

describe('UpdateClientByIdComponent', () => {
  let component: UpdateClientByIdComponent;
  let fixture: ComponentFixture<UpdateClientByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateClientByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClientByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
