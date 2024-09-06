import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { loadChannelListAction } from '../store/chat.actions'

@Injectable({
    providedIn: 'root'
})
export class ChatDataService {

    constructor(
        private store: Store
    ) {
    }

    loadChannels(): void {
        this.store.dispatch(loadChannelListAction())
    }
}
