import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, take } from 'rxjs'
import { authTokenSelector } from '../../modules/auth/store/auth.selectors'

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const store = inject(Store)
    const router = inject(Router);

    return store.select(authTokenSelector)
        .pipe(
            take(1),
            map((token: string | undefined) => {
                const isLoginPage: boolean = state.url.includes('login')
                if (!token && !isLoginPage) {
                    return new RedirectCommand(router.parseUrl('/login'))
                } else if (isLoginPage && token) {
                    return new RedirectCommand(router.parseUrl('/'))
                }
                return true
            })
        )
}
