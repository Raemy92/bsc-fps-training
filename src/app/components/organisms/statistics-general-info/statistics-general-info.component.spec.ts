import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsGeneralInfoComponent } from './statistics-general-info.component';

describe('StatisticsGeneralInfoComponent', () => {
  let component: StatisticsGeneralInfoComponent;
  let fixture: ComponentFixture<StatisticsGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsGeneralInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticsGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
