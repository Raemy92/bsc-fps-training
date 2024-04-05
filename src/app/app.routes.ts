import { Routes } from '@angular/router'
import { LoginComponent } from './components/pages/login/login.component'
import { DashboardComponent } from './components/pages/dashboard/dashboard.component'
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard'
import { TrainingComponent } from './components/pages/training/training.component'
import { TrainingOverviewComponent } from './components/pages/training-overview/training-overview.component'
import { AwardsComponent } from './components/pages/awards/awards.component'
import { StatisticsComponent } from './components/pages/statistics/statistics.component'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard'])

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToDashboard)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'training',
    component: TrainingOverviewComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'training/game',
    component: TrainingComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'awards',
    component: AwardsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    ...canActivate(redirectUnauthorizedToLogin)
  }
]
