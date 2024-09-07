import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatOption, MatSelect } from '@angular/material/select'
import { BehaviorSubject, take } from 'rxjs'
import { UserData } from '../../../user/models/user.model'
import { ChannelUsersService } from '../../services/channel-users.service'

@Component({
    selector: 'app-add-channel-user-dialog',
    standalone: true,
    imports: [
        MatDialogContent,
        MatFormField,
        MatInput,
        MatSelect,
        MatOption,
        AsyncPipe,
        ReactiveFormsModule,
        MatLabel,
        MatDialogActions,
        MatButton
    ],
    templateUrl: './add-channel-user-dialog.component.html',
    styleUrl: './add-channel-user-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddChannelUserDialogComponent {
    userControl: FormControl<string[] | null> = new FormControl(null, Validators.required)
    users$ = new BehaviorSubject<UserData[]>([])

    constructor(
        private channelUserService: ChannelUsersService,
        private dialogRef: MatDialogRef<AddChannelUserDialogComponent>,
        private destroyRef: DestroyRef
    ) {
        this.channelUserService.getUsersToAddInChannels()
            .pipe(take(1), takeUntilDestroyed(this.destroyRef))
            .subscribe((usersToAdd: UserData[]) => {
                this.users$.next(usersToAdd)
            })
    }

    close(value?: string[] | null): void {
        this.dialogRef.close(value)
    }

    addUsers(): void {
        const userIds: string[] | null = this.userControl.value
        console.log(userIds)
        this.close(userIds)
    }
}
