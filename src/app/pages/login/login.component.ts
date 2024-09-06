import { Component } from '@angular/core'
import { LoginFormComponent } from '../../modules/auth/components/login-form/login-form.component'

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        LoginFormComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
}
