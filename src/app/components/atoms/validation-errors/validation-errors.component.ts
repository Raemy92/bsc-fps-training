import { Component, Input } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { AbstractControl } from '@angular/forms'
import { ValidationErrorService } from '../../../services/validation-error.service'

@Component({
  selector: 'app-validation-errors',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div class="" *ngIf="!model.pristine && model.errors">
      <p
        class=""
        *ngFor="
          let error of validationErrorService.friendlyValidationErrors(
            model.errors,
            name
          )
        "
      >
        {{ error }}
      </p>
    </div>
  `,
  styles: ``
})
export class ValidationErrorsComponent {
  @Input({ required: true }) public model!: AbstractControl
  @Input({ required: true }) public name!: string

  public constructor(
    public readonly validationErrorService: ValidationErrorService
  ) {}
}
