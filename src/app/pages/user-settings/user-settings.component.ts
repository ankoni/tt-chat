import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { MainHeaderComponent } from '../../components/main-header/main-header.component'
import { UserInfoComponent } from '../../modules/user/components/user-info/user-info.component'
import { UserData, UserState } from '../../modules/user/models/user.model'
import { getCurrentUser } from '../../modules/user/store/user.selectors'

@Component({
    selector: 'app-user-settings',
    standalone: true,
    imports: [
        MainHeaderComponent,
        UserInfoComponent,
        AsyncPipe
    ],
    templateUrl: './user-settings.component.html',
    styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent {
    constructor(
        private store: Store<{ user: UserState }>
    ) {
    }
}
