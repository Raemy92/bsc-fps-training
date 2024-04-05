import { Component, Input } from '@angular/core'
import { NbCardModule, NbListModule, NbTabsetModule } from '@nebular/theme'
import { NgForOf } from '@angular/common'
import { TrainingRankingComponent } from '../../molecules/training-ranking/training-ranking.component'
import { TRAINING_COLLECTION_IDS } from '../../../resources/constants.resources'

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    NbListModule,
    NgForOf,
    NbCardModule,
    NbTabsetModule,
    TrainingRankingComponent
  ],
  template: `
    <nb-tabset fullWidth>
      <nb-tab tabTitle="Reaction">
        <app-training-ranking
          [collectionName]="trainingCollectionIds.REACTION"
          [options]="{
            orderBy: [['averageReactionTime', 'asc']],
            limit: this.limit
          }"
        ></app-training-ranking>
      </nb-tab>
      <nb-tab tabTitle="Target Shooting">
        <app-training-ranking
          [collectionName]="trainingCollectionIds.TARGET"
          [options]="{ orderBy: [['points', 'desc']], limit: this.limit }"
        ></app-training-ranking>
      </nb-tab>
      <nb-tab tabTitle="Moving Target">
        <app-training-ranking
          [collectionName]="trainingCollectionIds.MOVING_TARGET"
          [options]="{ orderBy: [['points', 'desc']], limit: this.limit }"
        ></app-training-ranking>
      </nb-tab>
      <nb-tab tabTitle="Quick Hit">
        <app-training-ranking
          [collectionName]="trainingCollectionIds.QUICK_HIT"
          [options]="{
            orderBy: [
              ['points', 'desc'],
              ['highestStreak', 'desc']
            ],
            limit: this.limit
          }"
        ></app-training-ranking>
      </nb-tab>
    </nb-tabset>
  `,
  styles: `
    nb-tab {
      padding: 0 !important;
    }
  `
})
export class RankingComponent {
  @Input() limit: number = 10

  public readonly trainingCollectionIds = TRAINING_COLLECTION_IDS
}
