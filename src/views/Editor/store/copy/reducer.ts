import { produce } from 'immer'
import { Reducer } from 'redux'
// import { ComponentType } from 'react'

import * as actionTypes from './actionTypes'

export interface ICopyState {
  copyData: any // 复制粘贴剪切
  isCut: boolean
}

export const defaultState = { copyData: null, isCut: false }

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: ICopyState) => {
    switch (action.type) {
      // case actionTypes.SHOW_CONTEXT_MENU:
      //   draft.menuShow = true
      //   return
      // case actionTypes.HIDE_CONTEXT_MENU:
      //   draft.menuShow = false
      //   return
      // case actionTypes.CONTEXT_MENU_LEFT:
      //   draft.menuLeft = action.payload
      //   return
      // case actionTypes.CONTEXT_MENU_TOP:
      //   draft.menuTop = action.payload
      //   return
      default:
        return state
    }
  })

export default reducer
