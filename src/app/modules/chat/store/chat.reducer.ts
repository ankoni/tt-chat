import { createReducer, on } from '@ngrx/store'
import { ChannelData } from '../models/channel.model'
import { saveChannelListAction } from './chat.actions'

type ChatState = {
    channels: ChannelData[]
}

const initialState: ChatState = {
    channels: []
}

export const chatReducer = createReducer(
    initialState,
    on(saveChannelListAction, (state, { data }) => {
        return {
            ...state,
            channels: [...data]
        }
    })
)
