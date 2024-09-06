import { createAction, props } from '@ngrx/store'
import { UserData } from '../models/user.model'

export enum UserActions {
    updateOnlineAndLoadUser = 'LOAD_USER',
    saveUser = 'SAVE_USER',
    updateOnlineState = 'UPDATE_ONLINE_STATE',
    updateUserData = 'UPDATE_USER',
}

export const updateOnlineAndLoadUserAction = createAction(UserActions.updateOnlineAndLoadUser)
export const saveUserAction = createAction(UserActions.saveUser, props<{ data: UserData }>())
export const updateOnlineAction = createAction(UserActions.updateOnlineState, props<{ isOnline: boolean }>())
export const updateUserDataAction = createAction(UserActions.updateUserData, props<{ data: Partial<UserData> }>())
