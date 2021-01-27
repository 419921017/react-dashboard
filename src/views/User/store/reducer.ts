import { produce } from 'immer'
import { Reducer } from 'redux'
import * as actionTypes from './constants'

interface IUserInfo {
  username: string
  nickname: string
}

export interface IState {
  userInfo: IUserInfo
  sentStatus: boolean
  loginStatus: boolean
}

export const defaultState: IState = {
  userInfo: {
    username: '',
    nickname: '',
  },
  sentStatus: false,
  loginStatus: false,
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: any) => {
    switch (action.type) {
      case actionTypes.CHANGE_USER_INFO:
        draft.userInfo = action.payload
        return draft.userInfo
      case actionTypes.CHANGE_SENT_STATUS:
        draft.sentStatus = action.payload
        return draft.sentStatus
      case actionTypes.CHANGE_LOGIN_STATUS:
        draft.loginStatus = action.payload
        return draft.loginStatus
      default:
        return state
    }
  })

export default reducer
