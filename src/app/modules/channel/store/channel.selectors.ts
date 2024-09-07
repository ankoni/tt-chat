import { createSelector } from '@ngrx/store'
import { ChannelData, ChatState } from '../models/channel.model'

type ChatSelectorState = {
    chat: ChatState
}

export const getAllChannels = (state: ChatSelectorState) => state.chat.channels ?? []

export const getChannelById = (channelId: string) => createSelector(
    getAllChannels,
    (channels: ChannelData[]) =>
        channels.find((channel: ChannelData) => channel.id === channelId)
)

export const getSelectedChannel = (state: ChatSelectorState) => state.chat.selectedChannelId
