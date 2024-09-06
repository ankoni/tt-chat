import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoginFormData, TokenData } from '../models/login.model'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    constructor(
        private http: HttpClient,
    ) {
    }

    loginRequest(loginData: LoginFormData): Observable<TokenData> {
        return this.http.post<TokenData>(
            '/api/login',
            {
                email: `${loginData.username}@mail.ru`,
                password: loginData.password
            }
        )
    }
}
