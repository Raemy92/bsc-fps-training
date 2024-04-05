import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMovingTargetResultsDialogComponent } from './training-moving-target-results-dialog.component';

describe('TrainingMovingTargetResultsDialogComponent', () => {
  let component: TrainingMovingTargetResultsDialogComponent;
  let fixture: ComponentFixture<TrainingMovingTargetResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingMovingTargetResultsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingMovingTargetResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
