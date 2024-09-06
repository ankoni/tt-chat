import { Routes } from '@angular/router'
import { authGuard } from './core/guards/auth.guard'

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    },
    {
        path: 'login',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'user',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/user-settings/user-settings.component').then(m => m.UserSettingsComponent),
    },
    {
        path: '**',
        redirectTo: ''
    }
]
