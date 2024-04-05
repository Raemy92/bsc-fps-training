import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingQuickHitResultsDialogComponent } from './training-quick-hit-results-dialog.component';

describe('TrainingQuickHitResultsDialogComponent', () => {
  let component: TrainingQuickHitResultsDialogComponent;
  let fixture: ComponentFixture<TrainingQuickHitResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingQuickHitResultsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingQuickHitResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
