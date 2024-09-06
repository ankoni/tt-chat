import { createAction, props } from '@ngrx/store'
import { ChannelData } from '../models/channel.model'

enum ChatActions {
    loadChannelList = 'LOAD_CHANNEL_LIST',
    saveChannelList = 'SAVE_CHANNEL_LIST',
    addChannel = 'ADD_CHANNEL',
    loadChannelUserList = 'LOAD_CHANNEL_USER_LIST',
    updateChannelUserList = 'UPDATE_CHANNEL_USER_LIST',
    addUserInChannel = 'ADD_USER_IN_CHANNEL',
}

export const loadChannelListAction = createAction(ChatActions.loadChannelList)
export const saveChannelListAction = createAction(ChatActions.saveChannelList, props<{ data: ChannelData[] }>())
