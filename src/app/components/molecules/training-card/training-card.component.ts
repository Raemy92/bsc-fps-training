import { Component, Input } from '@angular/core'
import { NbCardModule } from '@nebular/theme'
import { Training } from '../../../models/training/training.dto'

@Component({
  selector: 'app-training-card',
  standalone: true,
  imports: [NbCardModule],
  template: `
    <nb-card class="training-card-item">
      <nb-card-header>{{ training.name }}</nb-card-header>
      <nb-card-body>
        <p class="training-description">{{ training.shortDescription }}</p>
        <p class="training-leader">
          {{ getLeaderContent() }}
        </p>
      </nb-card-body>
    </nb-card>
  `,
  styles: `
    .training-card-item {
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border: 1px solid #ccc;
      }
    }
  `
})
export class TrainingCardComponent {
  @Input({ required: true }) public training!: Training

  public getLeaderContent(): string {
    if (this.training.id === 'training-reaction') {
      return this.training.leader?.name.length &&
        this.training.leader?.name !== 'bsc-init-user'
        ? `${this.training.leader.name} mit ${parseFloat((10000 - this.training.leader.points).toFixed(2))} ms`
        : 'Kein Leader'
    }
    return this.training.leader?.name.length &&
      this.training.leader?.name !== 'bsc-init-user'
      ? `${this.training.leader.name} mit ${this.training.leader.points} Punkten`
      : 'Kein Leader'
  }
}
