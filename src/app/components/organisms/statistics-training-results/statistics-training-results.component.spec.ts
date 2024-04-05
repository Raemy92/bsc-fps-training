import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsTrainingResultsComponent } from './statistics-training-results.component';

describe('StatisticsTrainingResultsComponent', () => {
  let component: StatisticsTrainingResultsComponent;
  let fixture: ComponentFixture<StatisticsTrainingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsTrainingResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsTrainingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
