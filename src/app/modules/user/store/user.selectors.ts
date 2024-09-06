import { UserData } from '../models/user.model'

type UserState = {
    user: UserData
}
export const getCurrentUser = (state: UserState) => {
    return Object.keys(state.user).length ? state.user : null
}
