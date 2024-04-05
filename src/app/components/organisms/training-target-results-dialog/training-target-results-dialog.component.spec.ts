import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTargetResultsDialogComponent } from './training-target-results-dialog.component';

describe('TrainingTargetResultsDialogComponent', () => {
  let component: TrainingTargetResultsDialogComponent;
  let fixture: ComponentFixture<TrainingTargetResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTargetResultsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingTargetResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
