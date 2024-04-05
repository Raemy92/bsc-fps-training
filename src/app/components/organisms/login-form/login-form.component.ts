import { Component, EventEmitter, Output } from '@angular/core'
import { LoginUser } from '../../../models/user/login-user.dto'
import { FormsModule, NgForm } from '@angular/forms'
import { NbButtonModule, NbCardModule } from '@nebular/theme'
import { InputComponent } from '../../atoms/input/input.component'

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [NbCardModule, InputComponent, FormsModule, NbButtonModule],
  template: `
    <nb-card>
      <nb-card-body>
        <form #getUserForm="ngForm" (submit)="getUser(getUserForm)">
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
            type="password"
            id="password"
            name="password"
            label="Password"
            placeholder=""
          />

          <button
            nbButton
            fullWidth
            status="primary"
            shape="semi-round"
            type="submit"
            [disabled]="getUserForm.invalid"
          >
            Login
          </button>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  styles: ``
})
export class LoginFormComponent {
  @Output()
  public userLogin: EventEmitter<LoginUser> = new EventEmitter<LoginUser>()

  public getUser(ngForm: NgForm) {
    this.userLogin.emit({
      email: ngForm.controls['email'].value,
      password: ngForm.controls['password'].value
    })
  }
}
