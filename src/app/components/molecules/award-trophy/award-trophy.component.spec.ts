import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardTrophyComponent } from './award-trophy.component';

describe('AwardTrophyComponent', () => {
  let component: AwardTrophyComponent;
  let fixture: ComponentFixture<AwardTrophyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardTrophyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwardTrophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
