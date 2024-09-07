import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButton } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { Observable, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { ChatState } from '../../../chat/models/channel.model'
import { getSelectedChannel } from '../../../chat/store/chat.selectors'
import { UserData } from '../../../user/models/user.model'
import { ChatsUsersData } from '../../models/chats-users.model'
import { ChannelUsersService } from '../../services/channel-users.service'
import { loadChannelUserList } from '../../store/chats-users.actions'
import { getChannelsUserWithoutCurrentUser } from '../../store/chats-users.selector'
import { AddChannelUserDialogComponent } from '../add-channel-user-dialog/add-channel-user-dialog.component'

@Component({
    selector: 'app-channel-user-list',
    standalone: true,
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        MatButton
    ],
    templateUrl: './channel-user-list.component.html',
    styleUrl: './channel-user-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelUserListComponent {
    private addUserDialog: MatDialogRef<AddChannelUserDialogComponent> | null = null
    selectedChannelId$: Observable<string | undefined> = this.store.select(getSelectedChannel)
    channelUsers$: Observable<UserData[]> = this.selectedChannelId$
        .pipe(
            tap((channelId?: string) => {
                if (channelId) {
                    this.store.dispatch(loadChannelUserList({ channelId }))
                }
            }),
            switchMap((channelId?: string) =>
                channelId ? this.store.select(getChannelsUserWithoutCurrentUser(channelId)) : of([])
            )
        )

    constructor(
        private store: Store<{ chat: ChatState, chatsUsers: ChatsUsersData, user: UserData }>,
        private dialog: MatDialog,
        private channelUsersService: ChannelUsersService,
        private destroyRef: DestroyRef
    ) {
    }

    addUser(): void {
        if (this.addUserDialog) {
            return
        }

        this.addUserDialog = this.dialog.open(AddChannelUserDialogComponent)
        this.addUserDialog.afterClosed()
            .pipe(
                tap(() => this.addUserDialog = null),
                withLatestFrom(this.selectedChannelId$),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(([userIds, channelId]: [string[], string | undefined]) => {
                if (userIds?.length && channelId) {
                    this.channelUsersService.addUsersInChannel(channelId, userIds)
                }
            })
    }
}
