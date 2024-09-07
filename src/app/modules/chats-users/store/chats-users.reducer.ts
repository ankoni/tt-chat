import { createReducer, on } from '@ngrx/store'
import { ChatsUsersData } from '../models/chats-users.model'
import { updateChannelUserList } from './chats-users.actions'

const initialState: ChatsUsersData = {}

export const chatsUserReducer = createReducer(
    initialState,
    on(updateChannelUserList, (state: ChatsUsersData, { channelId, usersData }) => {
        const updatedState: ChatsUsersData = Object.assign({}, state)
        updatedState[channelId] = usersData
        return updatedState
    })
)
