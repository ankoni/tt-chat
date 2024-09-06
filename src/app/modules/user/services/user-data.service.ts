import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { UserData } from '../models/user.model'
import { updateOnlineAndLoadUserAction } from '../store/user.actions'

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    constructor(
        private store: Store<{ user: UserData }>
    ) {
    }

    loadUserData(): void {
        this.store.dispatch(updateOnlineAndLoadUserAction())
    }
}
