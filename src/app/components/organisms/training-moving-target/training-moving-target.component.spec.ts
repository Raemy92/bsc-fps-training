import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMovingTargetComponent } from './training-moving-target.component';

describe('TrainingMovingTargetComponent', () => {
  let component: TrainingMovingTargetComponent;
  let fixture: ComponentFixture<TrainingMovingTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingMovingTargetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingMovingTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
