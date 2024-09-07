import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { UserData, UserState } from '../../models/user.model'
import { getCurrentUser } from '../../store/user.selectors'

@Component({
    selector: 'app-user-info',
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton
    ],
    templateUrl: './user-info.component.html',
    styleUrl: './user-info.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {
    formGroup: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(null),
    })


    constructor(
        private store: Store<{ user: UserState }>,
        private destroyRef: DestroyRef
    ) {
    }

    ngOnInit(): void {
        this.store.select(getCurrentUser)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((user: UserData | null) => {
                if (user) {
                    this.formGroup.disable()
                    this.formGroup.setValue({
                        username: user.username,
                        password: '****'
                    })
                }
            })
    }
}
