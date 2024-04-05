import { Component } from '@angular/core'
import { MovingTargetResultData } from '../training-moving-target/training-moving-target.component'
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme'
import { TrainingMovingTargetResultsComponent } from '../../molecules/training-moving-target-results/training-moving-target-results.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-training-moving-target-results-dialog',
  standalone: true,
  imports: [NbCardModule, TrainingMovingTargetResultsComponent, NbButtonModule],
  template: `
    <nb-card
      ><nb-card-header>Ergebnis</nb-card-header>
      <nb-card-body
        ><app-training-moving-target-results
          [trainingData]="trainingData"
        ></app-training-moving-target-results></nb-card-body
      ><nb-card-footer>
        <div class="">
          <button
            nbButton
            ghost
            status="primary"
            shape="semi-round"
            (click)="confirm()"
          >
            Beenden
          </button>
        </div>
      </nb-card-footer></nb-card
    >
  `,
  styles: ``
})
export class TrainingMovingTargetResultsDialogComponent {
  public readonly trainingData: MovingTargetResultData = {
    points: 0,
    perfectAim: false
  }

  public constructor(
    protected ref: NbDialogRef<TrainingMovingTargetResultsDialogComponent>,
    private router: Router
  ) {}

  public confirm() {
    this.ref.close()
    this.router.navigate(['/training'])
  }
}
