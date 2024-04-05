import { Component } from '@angular/core'
import {
  NbButtonModule,
  NbCardModule,
  NbDialogRef,
  NbLayoutModule
} from '@nebular/theme'
import { Award } from '../../../models/award/award.dto'
import { LazyImageComponent } from '../../atoms/lazy-image/lazy-image.component'

@Component({
  selector: 'app-new-award-dialog',
  standalone: true,
  imports: [NbCardModule, NbLayoutModule, LazyImageComponent, NbButtonModule],
  template: `
    <nb-card>
      <nb-card-header
        >Neue Auszeichnung erhalten: {{ award.name }}</nb-card-header
      >
      <nb-card-body class="flex flex-column align-center">
        <div>Gratuliere, du hast soeben eine neue Auszeichnung erhalten!</div>
        <div class="mt-2">
          <app-lazy-image
            src="assets/awards/{{ award.id }}.png"
          ></app-lazy-image>
        </div>
        <div class="mt-2 font-italic">{{ award.description }}</div>
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
            Schliessen
          </button>
        </div>
      </nb-card-footer>
    </nb-card>
  `,
  styles: ``
})
export class NewAwardDialogComponent {
  public readonly award!: Award

  public constructor(protected ref: NbDialogRef<NewAwardDialogComponent>) {}

  public confirm() {
    this.ref.close()
  }
}
