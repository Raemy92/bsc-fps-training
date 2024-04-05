import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingQuickHitComponent } from './training-quick-hit.component';

describe('TrainingQuickHitComponent', () => {
  let component: TrainingQuickHitComponent;
  let fixture: ComponentFixture<TrainingQuickHitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingQuickHitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingQuickHitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
