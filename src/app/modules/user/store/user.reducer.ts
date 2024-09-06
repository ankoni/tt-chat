import { createReducer, on } from '@ngrx/store'
import { UserData } from '../models/user.model'
import { saveUserAction } from './user.actions'

const initialState: UserData | {} = {}

export const userReducer = createReducer(
    initialState,
    on(saveUserAction, (state, { data }) => {
        return { ...data }
    })
)
