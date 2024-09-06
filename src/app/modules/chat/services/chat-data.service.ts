import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AddChannelData } from '../models/channel.model'
import { addChannel, loadChannelListAction } from '../store/chat.actions'

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

    addChannel(newChannelData: AddChannelData): void {
        this.store.dispatch(addChannel({ data: newChannelData }))
    }
}
