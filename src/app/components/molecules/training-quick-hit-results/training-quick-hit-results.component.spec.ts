import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingQuickHitResultsComponent } from './training-quick-hit-results.component';

describe('TrainingQuickHitResultsComponent', () => {
  let component: TrainingQuickHitResultsComponent;
  let fixture: ComponentFixture<TrainingQuickHitResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingQuickHitResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingQuickHitResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
