import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingStartDialogComponent } from './training-start-dialog.component';

describe('TrainingStartDialogComponent', () => {
  let component: TrainingStartDialogComponent;
  let fixture: ComponentFixture<TrainingStartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingStartDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingStartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
