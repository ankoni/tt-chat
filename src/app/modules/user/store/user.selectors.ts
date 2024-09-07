import { createSelector } from '@ngrx/store'
import { UserData, UserSelectorState, UserState } from '../models/user.model'

export const selectUserState = (state: UserSelectorState) => state.user
export const getCurrentUser = (state: UserSelectorState): UserData | null => {
    return state.user.currentUser && Object.keys(state.user.currentUser).length ? state.user.currentUser : null
}

export const getUserInfoById = (id: string) => createSelector(
    selectUserState,
    (user: UserState) => {
        return user.usersInfo?.[id]
    }
)
