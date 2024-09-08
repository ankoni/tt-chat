import { provideLocationMocks } from '@angular/common/testing'
import { TestBed } from '@angular/core/testing'
import { ActivatedRouteSnapshot, CanActivateFn, RedirectCommand, Router, RouterStateSnapshot } from '@angular/router'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Observable } from 'rxjs'

import { authGuard } from './auth.guard'

describe('authGuard', () => {
    const initialStoreState = {
        auth: {}
    }
    let store: MockStore
    const ActivatedRouteMock = jasmine.createSpyObj<ActivatedRouteSnapshot>(
        'ActivatedRouteSnapshot',
        ['url', 'data']
    )

    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => authGuard(...guardParameters))

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({ initialState: initialStoreState }),
                provideLocationMocks(),
            ]
        })
        store = TestBed.inject(MockStore)
    })

    it('should be created', () => {
        expect(executeGuard).toBeTruthy()
    })

    it('test redirect to /login', (done) => {
        (TestBed.runInInjectionContext(() => executeGuard(ActivatedRouteMock, { url: '/' } as RouterStateSnapshot)) as Observable<any>)
            .subscribe((val) => {
                expect(`${val.redirectTo}`).toBe('/login')
                done()
        })
    })

    it('test redirect to main', (done) => {
        store.setState({
            auth: { token: { accessToken: '123', user: {}}}
        });
        (TestBed.runInInjectionContext(() => executeGuard(ActivatedRouteMock, { url: '/login' } as RouterStateSnapshot)) as Observable<any>)
            .subscribe((val) => {
                expect(`${val.redirectTo}`).toEqual('/')
                done()
        })
    })

    it('test no redirect from login page', (done) => {
        (TestBed.runInInjectionContext(() => executeGuard(ActivatedRouteMock, { url: '/login' } as RouterStateSnapshot)) as Observable<any>)
            .subscribe((val) => {
                expect(val).toEqual(true)
                done()
            })
    })

    it('test no redirect from main page', (done) => {
        store.setState({
            auth: { token: { accessToken: '123', user: {}}}
        });
        (TestBed.runInInjectionContext(() => executeGuard(ActivatedRouteMock, { url: '/' } as RouterStateSnapshot)) as Observable<any>)
            .subscribe((val) => {
                expect(val).toEqual(true)
                done()
            })
    })
})
