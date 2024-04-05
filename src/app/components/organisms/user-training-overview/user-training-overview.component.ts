import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  NbButtonModule,
  NbIconModule,
  NbListModule,
  NbProgressBarModule
} from '@nebular/theme'
import { FirestoreDbService } from '../../../services/firestore-db.service'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { Training } from '../../../models/training/training.dto'
import { formatDate } from '../../../utils/date.util'

@Component({
  selector: 'app-user-training-overview',
  standalone: true,
  imports: [
    NbButtonModule,
    NbListModule,
    NgForOf,
    AsyncPipe,
    NbIconModule,
    NgIf,
    NbProgressBarModule
  ],
  template: `
    <span>Abgeschlossene Trainings heute:</span>
    <nb-progress-bar
      class="mt-1"
      status="success"
      [value]="percentageDone"
      [displayValue]="true"
    ></nb-progress-bar>
    <nb-list class="my-2">
      <nb-list-item *ngFor="let training of trainings">
        <nb-icon
          status="{{ iconStatus(training) }}"
          icon="{{ setIcon(training) }}"
        ></nb-icon>
        <div class="flex flex-column">
          <span class="font-bold">{{ training.name }}</span>
          <span class="font-italic">{{
            isTrainingDone[training.resultsCollection]
              ? 'abgeschlossen'
              : 'noch nicht abgeschlossen'
          }}</span>
        </div>
      </nb-list-item>
    </nb-list>
    <button nbButton status="success" (click)="navigateToTraining()">
      Zum Training
    </button>
  `,
  styles: `
    nb-list-item {
      gap: 1rem;
      padding: 0.75rem;
    }

    nb-icon {
      font-size: 1.5rem;
    }
  `
})
export class UserTrainingOverviewComponent implements OnInit {
  @Input({ required: true }) displayName = ''
  @Input({ required: true }) trainings: Training[] = []

  protected isTrainingDone: { [key: string]: boolean } = {}

  constructor(
    private readonly router: Router,
    private readonly firestoreDbService: FirestoreDbService
  ) {}

  ngOnInit() {
    this.trainings.forEach((training) =>
      this.getIsTrainingDone(training.resultsCollection)
    )
  }

  protected navigateToTraining() {
    this.router.navigate(['/training/'])
  }

  protected iconStatus(training: Training) {
    return this.isTrainingDone[training.resultsCollection]
      ? 'success'
      : 'warning'
  }

  protected setIcon(training: Training) {
    return this.isTrainingDone[training.resultsCollection]
      ? 'checkmark-circle-outline'
      : 'alert-triangle-outline'
  }

  get percentageDone() {
    return (
      (Object.values(this.isTrainingDone).filter((value) => value).length /
        this.trainings.length) *
      100
    )
  }

  protected getIsTrainingDone(trainingCollectionId: string) {
    this.firestoreDbService
      .getMultipleDocumentsFromCollection(trainingCollectionId, {
        customQuery: [
          {
            property: 'user',
            operator: '==',
            value: this.displayName
          },
          {
            property: 'date',
            operator: '==',
            value: formatDate(new Date(), false)
          }
        ]
      })
      .then((data) => {
        this.isTrainingDone[trainingCollectionId] = data.docs.length > 0
      })
  }
}
