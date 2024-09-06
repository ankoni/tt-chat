import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AuthState, LoginFormData } from '../models/login.model'
import { loginAction, resetAuthState } from '../store/auth.actions'

@Injectable()
export class LoginService {

    constructor(
        private authStore: Store<{ auth: AuthState }>,
    ) {
    }

    resetAuthState(): void {
        this.authStore.dispatch(resetAuthState())
    }

    login(loginData: LoginFormData): void {
        this.authStore.dispatch(loginAction({ data: loginData }))
    }
}
