import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideState, provideStore} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {AuthEffects} from './modules/auth/store/auth.effects'
import {authReducer} from './modules/auth/store/auth.reducer'
import {provideHttpClient} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { ChatEffects } from './modules/chat/store/chat.effects'
import { chatReducer } from './modules/chat/store/chat.reducer'
import { UserEffects } from './modules/user/store/user.effects'
import { userReducer } from './modules/user/store/user.reducer'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideHttpClient(),
        provideRouter(routes),
        provideStore({ auth: authReducer, user: userReducer, chat: chatReducer }),
        provideEffects([AuthEffects, UserEffects, ChatEffects]), provideAnimationsAsync(),
    ]
}
