import { Component, OnInit } from '@angular/core'
import { RankingComponent } from '../../organisms/ranking/ranking.component'
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service'
import { UserTrainingOverviewComponent } from '../../organisms/user-training-overview/user-training-overview.component'
import { FirestoreDbService } from '../../../services/firestore-db.service'
import { Training } from '../../../models/training/training.dto'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RankingComponent,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
    UserTrainingOverviewComponent,
    NgIf
  ],
  template: `
    <nb-layout>
      <nb-layout-column class="pt-0">
        <h1>{{ getTitle() }}</h1>
        <div class="grid grid-cols-3 gap-3">
          <nb-card accent="info" status="basic">
            <nb-card-header>Trainingsübersicht</nb-card-header>
            <nb-card-body>
              <app-user-training-overview
                *ngIf="trainings.length"
                [displayName]="displayName()"
                [trainings]="trainings"
              ></app-user-training-overview>
            </nb-card-body>
          </nb-card>
          <nb-card size="large" accent="info" status="basic" class="col-span-2">
            <nb-card-header>Top 10's</nb-card-header>
            <nb-card-body>
              <app-ranking></app-ranking>
            </nb-card-body>
          </nb-card>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
  styles: `
    nb-layout-column:first-child {
      flex: 1 !important;
    }
    nb-layout-column:last-child {
      flex: 2 !important;
    }
  `
})
export class DashboardComponent implements OnInit {
  public trainings: Training[] = []

  public constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly firestoreDbService: FirestoreDbService
  ) {}

  async ngOnInit() {
    this.trainings = await this.firestoreDbService.getTrainings()
  }

  public getTitle() {
    return `Hallo, ${this.authService.displayName}`
  }

  public displayName() {
    return this.authService.displayName || ''
  }
}
