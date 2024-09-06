import { createAction, props } from '@ngrx/store'
import { UserData } from '../models/user.model'

export enum UserActions {
    saveUser = 'SAVE_USER',
}

export const saveUserAction = createAction(UserActions.saveUser, props<{ data: UserData }>())
