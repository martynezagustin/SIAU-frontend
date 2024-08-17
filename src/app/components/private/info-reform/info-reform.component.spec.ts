import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoReformComponent } from './info-reform.component';

describe('InfoReformComponent', () => {
  let component: InfoReformComponent;
  let fixture: ComponentFixture<InfoReformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoReformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoReformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
