import { inject } from '@angular/core'
import { CanMatchFn, RedirectCommand, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, take } from 'rxjs'
import { authTokenSelector } from '../../modules/auth/store/auth.selectors'

export const authGuard: CanMatchFn = () => {
    const store = inject(Store)
    const router = inject(Router);
    return store.select(authTokenSelector)
        .pipe(
            take(1),
            map((token: string | undefined) => {
                if (!token) {
                    return new RedirectCommand(router.parseUrl('/login'))
                }
                return true
            })
        )
}
