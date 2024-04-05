import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReactionResultsComponent } from './training-reaction-results.component';

describe('TrainingReactionResultsComponent', () => {
  let component: TrainingReactionResultsComponent;
  let fixture: ComponentFixture<TrainingReactionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingReactionResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingReactionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
