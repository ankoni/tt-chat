import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, of, switchMap, tap } from 'rxjs'
import { UserData, UserState } from '../models/user.model'
import { loadUserDataById, updateOnlineAndLoadUserAction } from '../store/user.actions'
import { getUserInfoById } from '../store/user.selectors'

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    constructor(
        private store: Store<{ user: UserState }>
    ) {
    }

    loadUserData(): void {
        this.store.dispatch(updateOnlineAndLoadUserAction())
    }

    getUserInfoById(userId: string): Observable<UserData | undefined> {
        return this.store.select(getUserInfoById(userId))
            .pipe(
                tap((user?: UserData) => {
                   if (!user) {
                       this.store.dispatch(loadUserDataById({ id: userId }))
                   }
                }),
            )
    }
}
