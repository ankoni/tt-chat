import { Component, DestroyRef } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButton } from '@angular/material/button'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { filter, Observable, withLatestFrom } from 'rxjs'
import { AuthState, LoginFormData, LoginFormGroup } from '../../models/login.model'
import { LoginService } from '../../services/login.service'
import { authErrorSelector } from '../../store/auth.selectors'

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [
        AsyncPipe,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    providers: [LoginService],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
    authError$: Observable<string | undefined> = this.authStore.select(authErrorSelector)

    form: FormGroup<LoginFormGroup> = new FormGroup<LoginFormGroup>(
        {
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        }
    )

    constructor(
        private loginService: LoginService,
        private destroyRef: DestroyRef,
        private authStore: Store<{ auth: AuthState }>,
    ) {
        this.form.valueChanges.pipe(
            withLatestFrom(this.authError$),
            filter(([_, authError]) => !!authError),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: () => {
                this.loginService.resetAuthState()
            }
        })
    }

    handleLogin(): void {
        const formData: LoginFormData = this.form.getRawValue()
        this.loginService.login(formData)
    }
}
