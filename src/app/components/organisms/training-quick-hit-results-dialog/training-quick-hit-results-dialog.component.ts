import { Component } from '@angular/core'
import { QuickHitResultData } from '../training-quick-hit/training-quick-hit.component'
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme'
import { TrainingQuickHitResultsComponent } from '../../molecules/training-quick-hit-results/training-quick-hit-results.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-training-quick-hit-results-dialog',
  standalone: true,
  imports: [NbCardModule, TrainingQuickHitResultsComponent, NbButtonModule],
  template: `
    <nb-card>
      <nb-card-header>Ergebnis</nb-card-header>
      <nb-card-body
        ><app-training-quick-hit-results
          [trainingData]="trainingData"
        ></app-training-quick-hit-results>
      </nb-card-body>
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
export class TrainingQuickHitResultsDialogComponent {
  public readonly trainingData: QuickHitResultData = {
    points: 0,
    highestStreak: 0,
    perfectStreak: false,
    ctHits: 0
  }

  public constructor(
    protected ref: NbDialogRef<TrainingQuickHitResultsDialogComponent>,
    private router: Router
  ) {}

  public confirm() {
    this.ref.close()
    this.router.navigate(['/training'])
  }
}
