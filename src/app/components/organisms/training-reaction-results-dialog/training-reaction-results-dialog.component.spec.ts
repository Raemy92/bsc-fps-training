import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReactionResultsDialogComponent } from './training-reaction-results-dialog.component';

describe('TrainingReactionResultsDialogComponent', () => {
  let component: TrainingReactionResultsDialogComponent;
  let fixture: ComponentFixture<TrainingReactionResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingReactionResultsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingReactionResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
