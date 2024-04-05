import { Component } from '@angular/core'
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme'
import { TrainingReactionResultsComponent } from '../../molecules/training-reaction-results/training-reaction-results.component'
import { ReactionResultData } from '../training-reaction/training-reaction.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-training-reaction-results-dialog',
  standalone: true,
  imports: [NbButtonModule, NbCardModule, TrainingReactionResultsComponent],
  template: `
    <nb-card>
      <nb-card-header>Ergebnis</nb-card-header>
      <nb-card-body
        ><app-training-reaction-results
          [trainingData]="trainingData"
        ></app-training-reaction-results
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
export class TrainingReactionResultsDialogComponent {
  public readonly trainingData: ReactionResultData = {
    averageReactionTime: 10000,
    points: 0
  }

  public constructor(
    protected ref: NbDialogRef<TrainingReactionResultsDialogComponent>,
    private router: Router
  ) {}

  public confirm() {
    this.ref.close()
    this.router.navigate(['/training'])
  }
}
