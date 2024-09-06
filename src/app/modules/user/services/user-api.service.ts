import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(
        private http: HttpClient,
    ) {
    }

    updateUserOnline(userId: string): void {
        // this.store.select(getUserId)
        // this.http.post('/api/users/userId', { is_online: true })
    }
}
