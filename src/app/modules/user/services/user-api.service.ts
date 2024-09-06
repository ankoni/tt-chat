import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { UserData } from '../models/user.model'

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(
        private http: HttpClient,
    ) {
    }

    getUserDataRequest(userId: string): Observable<UserData> {
        return this.http.get<UserData>(`/api/users/${userId}`)
    }

    updateOnlineStateRequest(userId: string, isOnline: boolean): Observable<UserData> {
        return this.http.patch<UserData>(`/api/users/${userId}`, { is_online: isOnline })
    }
}
