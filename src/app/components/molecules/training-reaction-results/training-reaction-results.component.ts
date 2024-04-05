import { Component, Input } from '@angular/core'
import { ReactionResultData } from '../../organisms/training-reaction/training-reaction.component'

@Component({
  selector: 'app-training-reaction-results',
  standalone: true,
  imports: [],
  template: `
    <div class="training-target-results">
      <p>
        Durchschnittliche Reaktionszeit:
        {{ trainingData.averageReactionTime }}ms
      </p>
    </div>
  `,
  styles: ``
})
export class TrainingReactionResultsComponent {
  @Input({ required: true }) public trainingData!: ReactionResultData
}
