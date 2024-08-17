import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReformComponent } from './update-reform.component';

describe('UpdateReformComponent', () => {
  let component: UpdateReformComponent;
  let fixture: ComponentFixture<UpdateReformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateReformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
