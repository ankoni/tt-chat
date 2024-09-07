import { createSelector } from '@ngrx/store'
import { UserData } from '../../user/models/user.model'
import { getCurrentUser } from '../../user/store/user.selectors'
import { ChatsUsersData } from '../models/chats-users.model'

type ChatsUsersState = {
    chatsUsers: ChatsUsersData,
    user: UserData
}

export const getChatsUsers = (state: ChatsUsersState) => state.chatsUsers
export const getAllChannelsUser = (channelId: string) => createSelector(
    getChatsUsers,
    (chatsUsers: ChatsUsersData) => {
        return chatsUsers[channelId] ?? []
    }
)
export const getChannelsUserWithoutCurrentUser = (channelId: string) => createSelector(
    getCurrentUser,
    getAllChannelsUser(channelId),
    (currentUser: UserData | null, chatsUsers: UserData[]) => {
        const userId: string | undefined = currentUser?.id
        return chatsUsers.filter((users: UserData) => users.id !== userId)
    }
)
