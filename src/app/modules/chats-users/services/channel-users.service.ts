import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, of, switchMap, take } from 'rxjs'
import { ChatState } from '../../chat/models/channel.model'
import { getSelectedChannel } from '../../chat/store/chat.selectors'
import { UserData } from '../../user/models/user.model'
import { ChatsUsersData } from '../models/chats-users.model'
import { addUserToChannel } from '../store/chats-users.actions'
import { getAllChannelsUser } from '../store/chats-users.selector'
import { ChatsUsersApiService } from './chats-users-api.service'

@Injectable({
    providedIn: 'root'
})
export class ChannelUsersService {

    constructor(
        private store: Store<{ user: UserData, chatsUsers: ChatsUsersData, chat: ChatState }>,
        private chatsUserApiService: ChatsUsersApiService,
    ) {
    }

    getUsersToAddInChannels(): Observable<UserData[]> {
        return this.store.select(getSelectedChannel)
            .pipe(
                take(1),
                switchMap((channelId?: string) =>
                    channelId
                        ? this.store.select(getAllChannelsUser(channelId))
                            .pipe(take(1))
                        : of([])
                ),
                switchMap((users: UserData[]) => {
                    const excludedIds: string[] = users.map((user: UserData) => user.id)
                    return this.chatsUserApiService.getAllUsers(excludedIds)
                })
            )
    }

    addUsersInChannel(channelId: string, userIds: string[]): void {
        this.store.dispatch(addUserToChannel({ channelId, userIds }))
    }
}
