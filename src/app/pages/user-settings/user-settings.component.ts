import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'
import { MainHeaderComponent } from '../../components/main-header/main-header.component'
import { UserInfoComponent } from '../../modules/user/components/user-info/user-info.component'

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
    ) {
    }
}
