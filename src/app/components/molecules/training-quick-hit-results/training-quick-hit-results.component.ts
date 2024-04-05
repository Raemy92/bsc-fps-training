import { Component, Input } from '@angular/core'
import { QuickHitResultData } from '../../organisms/training-quick-hit/training-quick-hit.component'

@Component({
  selector: 'app-training-quick-hit-results',
  standalone: true,
  imports: [],
  template: `
    <div class="training-quick-hit-results">
      <p>Punkte: {{ trainingData.points }}</p>
      <p>Bester Streak: {{ trainingData.highestStreak }}</p>
    </div>
  `,
  styles: ``
})
export class TrainingQuickHitResultsComponent {
  @Input({ required: true }) public trainingData!: QuickHitResultData
}
