import { createReducer, on } from '@ngrx/store'
import { ChatState } from '../models/channel.model'
import { saveChannelListAction, selectChannel } from './chat.actions'

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
    }),
    on(selectChannel, (state, { id }) => {
        return { ...state, selectedChannelId: id }
    })
)
