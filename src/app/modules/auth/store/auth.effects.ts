import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, of, tap } from 'rxjs'
import { AuthError, LoginFormData, TokenData } from '../models/login.model'
import { AuthApiService } from '../services/auth-api.service'
import { authFailure, authSuccess, loginAction } from './auth.actions'

@Injectable()
export class AuthEffects {
    loginEffect$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(loginAction),
                exhaustMap(({ data }: { data: LoginFormData }) =>
                    this.loginService.loginRequest(data)
                        .pipe(
                            map((tokenData: TokenData) => {
                                this.router.navigate(['/'])
                                return authSuccess({ token: tokenData })
                            }),
                            catchError((error: unknown) => of(authFailure({ error: error as AuthError })))
                        )
                ),
            )
    )

    constructor(
        private actions$: Actions,
        private loginService: AuthApiService,
        private router: Router,
    ) {
    }
}
