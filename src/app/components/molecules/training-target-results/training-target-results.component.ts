import { Component, Input } from '@angular/core'
import { TargetResultData } from '../../organisms/training-target/training-target.component'

@Component({
  selector: 'app-training-target-results',
  standalone: true,
  imports: [],
  template: `
    <div class="training-target-results">
      <p>Durchschnittliche Zeit: {{ trainingData.averageTime }}ms</p>
      <p>Durchschnittliche Präzision: {{ trainingData.averagePrecision }}%</p>
      <p>Punkte: {{ trainingData.points }}</p>
    </div>
  `,
  styles: ``
})
export class TrainingTargetResultsComponent {
  @Input({ required: true }) public trainingData!: TargetResultData
}
