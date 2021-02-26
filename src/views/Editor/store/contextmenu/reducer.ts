import { produce } from 'immer'
import { Reducer } from 'redux'

import * as actionTypes from './actionTypes'

export interface IContextmenuState {
  menuTop: number
  menuLeft: number
  menuShow: boolean
}

export const defaultState = {
  menuTop: 0, // 右击菜单数据
  menuLeft: 0,
  menuShow: false,
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: IContextmenuState) => {
    switch (action.type) {
      case actionTypes.SHOW_CONTEXT_MENU:
        draft.menuShow = true
        return
      case actionTypes.HIDE_CONTEXT_MENU:
        draft.menuShow = false
        return
      case actionTypes.CONTEXT_MENU_LEFT:
        draft.menuLeft = action.payload
        return
      case actionTypes.CONTEXT_MENU_TOP:
        draft.menuTop = action.payload
    }
  })

export default reducer
