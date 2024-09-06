export type ChatState = {
    channels: ChannelData[]
}

export type ChannelUserRel = {
    channel_id: string
    user_id: string
}

export type ChannelData = {
    id: string
    name: string
    users?: string[]
}

export type AddChannelDialogData = Pick<AddChannelData, 'name'>

export type AddChannelData = {
    user_id: string
    name: string
}
