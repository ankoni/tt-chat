import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { MainHeaderComponent } from '../../components/main-header/main-header.component'
import { LoginService } from '../../modules/auth/services/login.service'
import { ChannelsListComponent } from '../../modules/chat/components/channels-list/channels-list.component'
import { ChatDataService } from '../../modules/chat/services/chat-data.service'
import {
    ChannelUserListComponent
} from '../../modules/chats-users/components/channel-user-list/channel-user-list.component'
import { UserData } from '../../modules/user/models/user.model'
import { UserDataService } from '../../modules/user/services/user-data.service'
import { getCurrentUser } from '../../modules/user/store/user.selectors'

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        MainHeaderComponent,
        AsyncPipe,
        ChannelsListComponent,
        ChannelUserListComponent
    ],
    providers: [
        ChatDataService
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
    username$: Observable<string> = this.store.select(getCurrentUser)
        .pipe(
            map((userData: UserData | null) => userData?.username ?? ''),
        )

    constructor(
        private store: Store<{ user: UserData }>,
        private userDataService: UserDataService,
        private loginService: LoginService
    ) {
    }

    ngOnInit(): void {
        this.userDataService.loadUserData()
    }

    logoutHandler(): void {
        this.loginService.logout()
    }
}
