import { Component, OnInit } from '@angular/core'
import { TrainingCardComponent } from '../../molecules/training-card/training-card.component'
import { FirestoreDbService } from '../../../services/firestore-db.service'
import { Training } from '../../../models/training/training.dto'
import { NgForOf } from '@angular/common'
import { Router } from '@angular/router'
import { ToastService } from '../../../services/toast.service'
import { NbLayoutModule } from '@nebular/theme'

@Component({
  selector: 'app-training-overview',
  standalone: true,
  imports: [TrainingCardComponent, NgForOf, NbLayoutModule],
  template: `
    <nb-layout>
      <nb-layout-column class="pt-0">
        <h1>Trainingsübersicht</h1>
        <div class="training-overview-container">
          <app-training-card
            *ngFor="let training of trainings"
            [training]="training"
            (click)="navigateToTraining(training)"
          ></app-training-card>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: `
    .training-overview-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
  `
})
export class TrainingOverviewComponent implements OnInit {
  protected trainings: Training[] = []

  public constructor(
    private readonly firestoreDbService: FirestoreDbService,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.firestoreDbService
      .getTrainings()
      .then((trainings) => {
        this.trainings = trainings.map((training) => {
          if (!training.leader) {
            training.leader = { name: '', points: 0 }
          }
          return training
        })

        const promises = this.trainings.map((training) =>
          this.firestoreDbService.getMultipleDocumentsFromCollection(
            training.resultsCollection,
            { orderBy: [['points', 'desc']], limit: 1 }
          )
        )

        return Promise.all(promises)
      })
      .then((responses) => {
        responses.forEach((response, index) => {
          const data = response.docs.map((doc) => doc.data())

          this.trainings[index].leader!.name = data[0]['user']
          this.trainings[index].leader!.points = data[0]['points']
        })
      })
      .catch((error) => {
        this.toastService.showError(error)
      })
  }

  protected navigateToTraining(training: Training) {
    this.router.navigate(['/training/game'], { state: { training } })
  }
}
