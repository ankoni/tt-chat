import { createAction, props } from '@ngrx/store'
import { AddChannelDialogData, ChannelData } from '../models/channel.model'

enum ChatActions {
    loadChannelList = 'LOAD_CHANNEL_LIST',
    saveChannelList = 'SAVE_CHANNEL_LIST',
    addChannel = 'ADD_CHANNEL',
    selectChannel = 'SELECT_CHANNEL',
}

export const loadChannelListAction = createAction(ChatActions.loadChannelList)
export const saveChannelListAction = createAction(ChatActions.saveChannelList, props<{ data: ChannelData[] }>())
export const addChannel = createAction(ChatActions.addChannel, props<{ data: AddChannelDialogData }>())
export const selectChannel = createAction(ChatActions.selectChannel, props<{ id: string }>())
