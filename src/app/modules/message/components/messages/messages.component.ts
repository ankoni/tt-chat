import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatFormField } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { Store } from '@ngrx/store'
import { filter, map, Observable, switchMap, tap } from 'rxjs'
import { ChannelData, ChatState } from '../../../channel/models/channel.model'
import { getSelectedChannel, getSelectedChannelInfo } from '../../../channel/store/channel.selectors'
import { MessageData, MessageStateData } from '../../models/message.model'
import { loadMessage, sendMessage } from '../../store/message.actions'
import { getChannelMessages } from '../../store/message.selectors'
import { MessageInputComponent } from '../message-input/message-input.component'
import { MessageItemComponent } from '../message-item/message-item.component'

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        MatFormField,
        MatInput,
        MessageInputComponent,
        MessageItemComponent
    ],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
    selectedChannel$: Observable<string | undefined> = this.store.select(getSelectedChannel)
    channelName$: Observable<string | undefined> = this.store.select(getSelectedChannelInfo)
        .pipe(map((channel: ChannelData | undefined) => channel?.name))

    messages$: Observable<MessageData[]> = this.selectedChannel$
        .pipe(
            filter(Boolean),
            tap(() => this.store.dispatch(loadMessage())),
            switchMap((channelId?: string) =>
                this.store.select(getChannelMessages(channelId))
            )
        )

    constructor(
        private store: Store<{messages: MessageStateData, channels: ChatState}>
    ) {
    }

    onSendEmitter(messageTest: string): void {
        if (messageTest) {
            this.store.dispatch(sendMessage({ content: messageTest }))
        }
    }
}
