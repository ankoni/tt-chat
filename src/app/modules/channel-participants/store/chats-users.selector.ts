import { createSelector } from '@ngrx/store'
import { UserData, UserState } from '../../user/models/user.model'
import { getCurrentUser } from '../../user/store/user.selectors'
import { ChannelParticipantData } from '../models/chats-users.model'

type ChatsUsersState = {
    channelParticipants: ChannelParticipantData,
    user: UserState ,
}

export const getChannelParticipants = (state: ChatsUsersState) => state.channelParticipants
export const getAllChannelParticipants = (channelId: string) => createSelector(
    getChannelParticipants,
    (channelParticipants: ChannelParticipantData) => {
        return channelParticipants[channelId] ?? []
    }
)
export const getChannelsParticipantsWithoutUser = (channelId: string) => createSelector(
    getCurrentUser,
    getAllChannelParticipants(channelId),
    (currentUser, channelParticipants) => {
        const userId: string | undefined = currentUser?.id
        return channelParticipants.filter((users: UserData) => users.id !== userId)
    }
)
