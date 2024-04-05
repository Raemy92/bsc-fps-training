import { Component, Input, OnInit } from '@angular/core'
import {
  NbCardModule,
  NbListModule,
  NbTabsetModule,
  NbUserModule
} from '@nebular/theme'
import { DocumentData } from '@angular/fire/firestore'
import { FirestoreDbService } from '../../../services/firestore-db.service'
import { NgForOf } from '@angular/common'
import { QueryDto } from '../../../models/query/query.dto'
import { TRAINING_COLLECTION_IDS } from '../../../resources/constants.resources'

@Component({
  selector: 'app-training-ranking',
  standalone: true,
  imports: [NbCardModule, NbTabsetModule, NbListModule, NgForOf, NbUserModule],
  template: `
    <nb-list>
      <nb-list-item *ngFor="let ranking of rankings; index as i">
        <span class="font-bold font-italic font-giant mr-2">{{ i + 1 }}.</span>
        <nb-user
          size="large"
          [name]="ranking['user']"
          [title]="getRankingText(ranking)"
        ></nb-user>
      </nb-list-item>
    </nb-list>
  `,
  styles: ``
})
export class TrainingRankingComponent implements OnInit {
  @Input({ required: true }) collectionName!: string
  @Input() options?: {
    customQuery?: QueryDto[]
    orderBy?: [string, 'asc' | 'desc'][]
    limit?: number
  }
  public rankings: DocumentData[] = []

  public constructor(private readonly firestoreDbService: FirestoreDbService) {}

  ngOnInit(): void {
    this.firestoreDbService
      .getMultipleDocumentsFromCollection(this.collectionName, {
        orderBy: this.options?.orderBy,
        limit: this.options?.limit,
        customQuery: [
          { property: 'user', operator: '!=', value: 'bsc-init-user' }
        ]
      })
      .then((data) => {
        this.rankings = data.docs.map((doc) => doc.data())
      })
  }

  getRankingText(ranking: DocumentData) {
    let rankingText = ''
    switch (this.collectionName) {
      case TRAINING_COLLECTION_IDS.TARGET:
        rankingText = `Punkte: ${ranking['points']}, Präzision: ${ranking['averagePrecision']}, Zeit: ${ranking['averageTime']}`
        break
      case TRAINING_COLLECTION_IDS.MOVING_TARGET:
        rankingText = `Punkte: ${ranking['points']}`
        break
      case TRAINING_COLLECTION_IDS.QUICK_HIT:
        rankingText = `Punkte: ${ranking['points']}, Bester Streak: ${ranking['highestStreak']}`
        break
      case TRAINING_COLLECTION_IDS.REACTION:
        rankingText = `Durchschnittliche Reaktionszeit: ${ranking['averageReactionTime']}`
        break
    }
    return rankingText
  }
}
