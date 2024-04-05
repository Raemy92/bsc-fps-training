import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainingOverviewComponent } from './user-training-overview.component';

describe('UserTrainingOverviewComponent', () => {
  let component: UserTrainingOverviewComponent;
  let fixture: ComponentFixture<UserTrainingOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTrainingOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTrainingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
