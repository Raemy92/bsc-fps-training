import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [],
  template: `
    <div class="">
      <label class="" [for]="id ? id : null">{{ label }}</label>
    </div>
  `,
  styles: ``
})
export class LabelComponent {
  @Input({ required: true }) public label: string | undefined
  @Input() public id!: string
}
