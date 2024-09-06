import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { ChannelData, ChatState } from '../../models/channel.model'
import { ChatDataService } from '../../services/chat-data.service'
import { getAllChannels } from '../../store/chat.selectors'

@Component({
    selector: 'app-channels-list',
    standalone: true,
    imports: [
        AsyncPipe
    ],
    templateUrl: './channels-list.component.html',
    styleUrl: './channels-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsListComponent implements OnInit {
    channelList$: Observable<ChannelData[]> = this.store.select(getAllChannels)

    constructor(
        private store: Store<{ chat: ChatState }>,
        private chatDataService: ChatDataService,
    ) {
    }

    ngOnInit(): void {
        this.chatDataService.loadChannels()
    }
}
