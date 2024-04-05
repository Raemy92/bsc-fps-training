import { Component } from '@angular/core'
import { NbButtonModule, NbCardModule, NbDialogRef } from '@nebular/theme'
import { Training } from '../../../models/training/training.dto'

@Component({
  selector: 'app-training-start-dialog',
  standalone: true,
  imports: [NbCardModule, NbButtonModule],
  template: `
    <nb-card>
      <nb-card-header>{{ training.name }}</nb-card-header>
      <nb-card-body>{{ training.longDescription }}</nb-card-body>
      <nb-card-footer>
        <button nbButton status="success" (click)="confirm()">Start</button>
      </nb-card-footer>
    </nb-card>
  `,
  styles: ``
})
export class TrainingStartDialogComponent {
  public readonly training!: Training

  public constructor(
    protected ref: NbDialogRef<TrainingStartDialogComponent>
  ) {}

  public confirm() {
    this.ref.close()
  }
}
