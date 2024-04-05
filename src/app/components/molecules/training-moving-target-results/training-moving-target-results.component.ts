import { Component, Input } from '@angular/core'
import { MovingTargetResultData } from '../../organisms/training-moving-target/training-moving-target.component'

@Component({
  selector: 'app-training-moving-target-results',
  standalone: true,
  imports: [],
  template: `
    <div class="training-moving-target-results">
      <p>Punkte: {{ trainingData.points }}</p>
    </div>
  `,
  styles: ``
})
export class TrainingMovingTargetResultsComponent {
  @Input({ required: true }) public trainingData!: MovingTargetResultData
}
