import { Injectable } from '@angular/core'

export enum LocalStorageKeyItem {
    auth = 'auth'
}
const LOCAL_STORAGE_KEY = 'ch-ls_'

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    setItem<T>(key: LocalStorageKeyItem, value: T): void {
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    getItem<T>(key: LocalStorageKeyItem): T | null {
        const data: string | null = window.localStorage.getItem(key)
        return data ? JSON.parse(data) : null
    }

    clear(): void {
        window.localStorage.clear()
    }
}
