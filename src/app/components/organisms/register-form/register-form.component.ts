import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { NbButtonModule, NbCardModule } from '@nebular/theme'
import { InputComponent } from '../../atoms/input/input.component'
import { ValidationErrorsComponent } from '../../atoms/validation-errors/validation-errors.component'
import { RegisterUser } from '../../../models/user/register-user.dto'

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    NbCardModule,
    InputComponent,
    FormsModule,
    NbButtonModule,
    ValidationErrorsComponent
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form #createUserForm="ngForm" (submit)="registerUser(createUserForm)">
          <app-input
            ngModel
            required
            minlength="3"
            maxlength="32"
            id="username"
            name="username"
            label="Username"
            placeholder="johndoe"
          />

          <app-input
            ngModel
            required
            id="email"
            name="email"
            label="Email"
            placeholder="john@doe.com"
          />

          <app-input
            ngModel
            required
            minlength="8"
            maxlength="255"
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder=""
          />

          <app-input
            ngModel
            required
            minlength="8"
            maxlength="255"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirm Password"
            placeholder=""
          />

          <app-validation-errors
            [model]="createUserForm.form"
            [name]="'Form'"
          />

          <button
            nbButton
            fullWidth
            status="primary"
            shape="semi-round"
            type="submit"
            [disabled]="createUserForm.invalid"
          >
            Signup
          </button>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  styles: ``
})
export class RegisterFormComponent {
  @Output()
  public createUser: EventEmitter<RegisterUser> =
    new EventEmitter<RegisterUser>()

  public registerUser(ngForm: NgForm) {
    if (
      ngForm.controls['password'].value !==
      ngForm.controls['passwordConfirmation'].value
    ) {
      alert('Passwords do not match')
      return
    }

    this.createUser.emit({
      username: ngForm.controls['username'].value,
      email: ngForm.controls['email'].value,
      password: ngForm.controls['password'].value
    })

    ngForm.resetForm()
  }
}
