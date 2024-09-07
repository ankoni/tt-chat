import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, Input, ViewEncapsulation } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatList, MatListItem, MatListItemLine, MatListItemTitle } from '@angular/material/list'
import { BehaviorSubject, filter, map } from 'rxjs'
import { UserData } from '../../../user/models/user.model'
import { UserApiService } from '../../../user/services/user-api.service'
import { UserDataService } from '../../../user/services/user-data.service'

@Component({
    selector: 'app-message-item',
    standalone: true,
    imports: [
        AsyncPipe,
        MatListItemTitle,
        MatListItemLine,
        MatListItem
    ],
    templateUrl: './message-item.component.html',
    styleUrl: './message-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageItemComponent {
    userName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

    @Input() set userId(id: string) {
        this.initUserGetInfo(id)
    }

    @Input() content!: string

    constructor(
        private userApiService: UserApiService,
        private userService: UserDataService,
        private destroyRef: DestroyRef
    ) {
    }

    private initUserGetInfo(id: string): void {
        if (!id) {
            return
        }
        this.userService.getUserInfoById(id)
            .pipe(
                filter(Boolean),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((userData: UserData) => {
                this.userName$.next(userData.username)
            })
    }
}
