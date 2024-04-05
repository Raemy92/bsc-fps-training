import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTargetComponent } from './training-target.component';

describe('TrainingTargetComponent', () => {
  let component: TrainingTargetComponent;
  let fixture: ComponentFixture<TrainingTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTargetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
