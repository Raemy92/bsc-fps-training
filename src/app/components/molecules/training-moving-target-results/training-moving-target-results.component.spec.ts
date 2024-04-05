import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMovingTargetResultsComponent } from './training-moving-target-results.component';

describe('TrainingMovingTargetResultsComponent', () => {
  let component: TrainingMovingTargetResultsComponent;
  let fixture: ComponentFixture<TrainingMovingTargetResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingMovingTargetResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingMovingTargetResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
