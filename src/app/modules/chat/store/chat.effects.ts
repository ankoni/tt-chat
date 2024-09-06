import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { exhaustMap, map, withLatestFrom } from 'rxjs'
import { AuthState } from '../../auth/models/login.model'
import { authIdSelector } from '../../auth/store/auth.selectors'
import { ChannelData } from '../models/channel.model'
import { ChatApiService } from '../services/chat-api.service'
import { loadChannelListAction, saveChannelListAction } from './chat.actions'

@Injectable()
export class ChatEffects {
    loadChannels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadChannelListAction),
            withLatestFrom(this.store.select(authIdSelector)),
            exhaustMap(([_, userId]: [Action, string | undefined]) => {
                if (!userId) {
                    throw new Error('userId is empty')
                }
                return this.chatApiService.getAllChannelsData(userId)
                    .pipe(
                        map((channelData: ChannelData[]) =>
                            saveChannelListAction({ data: channelData })
                        )
                    )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private store: Store<{ auth: AuthState }>,
        private chatApiService: ChatApiService,
    ) {
    }
}
