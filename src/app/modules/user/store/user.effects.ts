import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { EMPTY, exhaustMap, map, of, switchMap, take, withLatestFrom } from 'rxjs'
import { AuthState } from '../../auth/models/login.model'
import { AuthApiService } from '../../auth/services/auth-api.service'
import { authIdSelector } from '../../auth/store/auth.selectors'
import { UserData } from '../models/user.model'
import { UserApiService } from '../services/user-api.service'
import { updateOnlineAndLoadUserAction, saveUserAction, updateOnlineAction, updateUserDataAction } from './user.actions'
import { getCurrentUser } from './user.selectors'

@Injectable()
export class UserEffects {
    loadAuthUserData$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(updateOnlineAndLoadUserAction),
                withLatestFrom(
                    this.store.select(authIdSelector),
                    this.store.select(getCurrentUser)
                ),
                exhaustMap(([_, userId, currentUserData]: [Action, string | undefined, UserData | null]) => {
                    if (!userId) {
                        throw new Error('User id not found')
                    }
                    if (currentUserData) {
                        return EMPTY
                    }
                    return this.userApiService.updateOnlineStateRequest(userId, true)
                        .pipe(
                            map((userData: UserData) =>
                                saveUserAction({ data: userData })
                            )
                        )
                }),
            )
    )

    updateOnline$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOnlineAction),
            withLatestFrom(this.store.select(authIdSelector)),
            exhaustMap(([{ isOnline }, id]: [{ isOnline: boolean }, string | undefined]) => {
                if (!id) {
                    throw new Error('User id not found')
                }

                return this.userApiService.updateOnlineStateRequest(id, isOnline)
                    .pipe(
                        map((updatedData: UserData) => updateUserDataAction({ data: updatedData }))
                    )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private userApiService: UserApiService,
        private store: Store<{ auth: AuthState, user: UserData }>
    ) {
    }
}
