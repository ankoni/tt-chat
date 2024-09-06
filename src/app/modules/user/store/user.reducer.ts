import { createReducer, on } from '@ngrx/store'
import { UserData } from '../models/user.model'
import { saveUserAction, updateUserDataAction } from './user.actions'

const initialState: UserData | {} = {}

export const userReducer = createReducer(
    initialState,
    on(saveUserAction, (_, { data }) => {
        return { ...data }
    }),
    on(updateUserDataAction, (state, { data }) => {
        return { ...state, ...data }
    })
)
