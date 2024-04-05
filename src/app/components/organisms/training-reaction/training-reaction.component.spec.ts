import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReactionComponent } from './training-reaction.component';

describe('TrainingReactionComponent', () => {
  let component: TrainingReactionComponent;
  let fixture: ComponentFixture<TrainingReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingReactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
