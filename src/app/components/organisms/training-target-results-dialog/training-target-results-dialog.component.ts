import { Component } from '@angular/core'
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme'
import { TrainingTargetResultsComponent } from '../../molecules/training-target-results/training-target-results.component'
import { TargetResultData } from '../training-target/training-target.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-training-target-results-dialog',
  standalone: true,
  imports: [NbCardModule, NbButtonModule, TrainingTargetResultsComponent],
  template: `
    <nb-card>
      <nb-card-header>Ergebnis</nb-card-header>
      <nb-card-body
        ><app-training-target-results
          [trainingData]="trainingData"
        ></app-training-target-results
      ></nb-card-body>
      <nb-card-footer>
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
      </nb-card-footer>
    </nb-card>
  `,
  styles: ``
})
export class TrainingTargetResultsDialogComponent {
  public readonly trainingData: TargetResultData = {
    averagePrecision: 0,
    averageTime: 0,
    points: 0
  }

  public constructor(
    protected ref: NbDialogRef<TrainingTargetResultsDialogComponent>,
    private router: Router
  ) {}

  public confirm() {
    this.ref.close()
  }
}
