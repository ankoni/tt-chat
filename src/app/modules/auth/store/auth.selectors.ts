import {AuthState} from '../models/login.model'

type AuthSelectorData = {
    auth: AuthState
}
export const authErrorSelector = ({ auth }: AuthSelectorData) => auth.error
export const authTokenSelector = (state: AuthSelectorData) => state.auth.token?.accessToken
