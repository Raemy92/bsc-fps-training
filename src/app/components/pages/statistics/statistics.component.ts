import { Component, OnInit } from '@angular/core'
import { NbCardModule, NbLayoutModule, NbTabsetModule } from '@nebular/theme'
import { FirestoreDbService } from '../../../services/firestore-db.service'
import { AuthService } from '../../../services/auth.service'
import {
  TrainingByUser,
  TrainingStatistics,
  TrainingStatisticsGeneral
} from '../../../models/training/training.dto'
import { StatisticsGeneralInfoComponent } from '../../organisms/statistics-general-info/statistics-general-info.component'
import { NgIf } from '@angular/common'
import { StatisticsService } from '../../../services/statistics.service'
import { StatisticsTrainingResultsComponent } from '../../organisms/statistics-training-results/statistics-training-results.component'
import { RankingComponent } from '../../organisms/ranking/ranking.component'

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    NbLayoutModule,
    NbCardModule,
    StatisticsGeneralInfoComponent,
    NgIf,
    NbTabsetModule,
    StatisticsTrainingResultsComponent,
    RankingComponent
  ],
  template: `
    <nb-layout>
      <nb-layout-column class="pt-0">
        <h1>Deine Statistiken</h1>
        <div class="grid grid-cols-2 gap-3">
          <nb-card accent="info" status="basic" size="giant" class="mb-0">
            <nb-card-header>Allgemeine Infos</nb-card-header>
            <nb-card-body>
              <app-statistics-general-info
                *ngIf="statisticsGeneral.length"
                [statistics]="statisticsGeneral"
              ></app-statistics-general-info>
            </nb-card-body>
          </nb-card>
          <nb-card accent="info" status="basic" size="giant" class="mb-0">
            <nb-card-header>Rangliste</nb-card-header>
            <nb-card-body
              ><app-ranking [limit]="100"></app-ranking
            ></nb-card-body>
          </nb-card>
          <nb-card accent="info" status="basic" size="large" class="col-span-2">
            <nb-card-header>Trainingsstatistiken</nb-card-header>
            <nb-card-body>
              <app-statistics-training-results
                *ngIf="statisticsTrainings"
                [statistics]="statisticsTrainings"
              ></app-statistics-training-results
            ></nb-card-body>
          </nb-card>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: ``
})
export class StatisticsComponent implements OnInit {
  private trainingsByUser: TrainingByUser[] = []
  public statisticsGeneral: TrainingStatisticsGeneral[] = []
  public statisticsTrainings: TrainingStatistics | undefined = undefined

  constructor(
    private readonly authService: AuthService,
    private readonly firestoreDbService: FirestoreDbService,
    private readonly statisticsService: StatisticsService
  ) {}

  async ngOnInit() {
    this.trainingsByUser = await this.firestoreDbService.getAllTrainingsByUser(
      this.authService.displayName
    )

    this.statisticsGeneral = this.statisticsService.getGeneralStatistics(
      this.trainingsByUser
    )

    this.statisticsTrainings = this.statisticsService.getTrainingStatistics(
      this.trainingsByUser
    )
  }
}
