import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TrainingRankingComponent } from './training-ranking.component'

describe('TrainingTargetRankingComponent', () => {
  let component: TrainingRankingComponent
  let fixture: ComponentFixture<TrainingRankingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingRankingComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TrainingRankingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
