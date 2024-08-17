import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReformsByClientIdComponent } from './get-reforms-by-client-id.component';

describe('GetReformsByClientIdComponent', () => {
  let component: GetReformsByClientIdComponent;
  let fixture: ComponentFixture<GetReformsByClientIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetReformsByClientIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetReformsByClientIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
