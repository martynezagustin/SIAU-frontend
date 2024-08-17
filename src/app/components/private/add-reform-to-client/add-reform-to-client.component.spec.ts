import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReformToClientComponent } from './add-reform-to-client.component';

describe('AddReformToClientComponent', () => {
  let component: AddReformToClientComponent;
  let fixture: ComponentFixture<AddReformToClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReformToClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReformToClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
