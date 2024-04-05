import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTargetResultsComponent } from './training-target-results.component';

describe('TrainingTargetResultsComponent', () => {
  let component: TrainingTargetResultsComponent;
  let fixture: ComponentFixture<TrainingTargetResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTargetResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingTargetResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
