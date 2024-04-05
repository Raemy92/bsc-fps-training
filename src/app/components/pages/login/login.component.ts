import { Component } from '@angular/core'
import { AuthService } from '../../../services/auth.service'
import { NbTabsetModule } from '@nebular/theme'
import { LoginFormComponent } from '../../organisms/login-form/login-form.component'
import { LoginUser } from '../../../models/user/login-user.dto'
import { RegisterFormComponent } from '../../organisms/register-form/register-form.component'
import { RegisterUser } from '../../../models/user/register-user.dto'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NbTabsetModule, LoginFormComponent, RegisterFormComponent],
  template: `
    <div class="">
      <nb-tabset fullWidth class="">
        <nb-tab tabTitle="Login">
          <app-login-form (userLogin)="onLogin($event)" />
        </nb-tab>
        <nb-tab tabTitle="Register"
          ><app-register-form (createUser)="onSignup($event)"
        /></nb-tab>
      </nb-tabset>
    </div>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public constructor(private readonly authService: AuthService) {}

  public onLogin(event: LoginUser) {
    this.authService.login(event.email, event.password)
  }

  public onSignup(event: RegisterUser) {
    this.authService.signUp(event.email, event.password, event.username)
  }
}
