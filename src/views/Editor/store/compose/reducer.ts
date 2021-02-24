import { produce } from 'immer'
import { Reducer } from 'redux'

import * as actionTypes from './actionTypes'
import { IEditComponent } from '../edit/reducer'

export interface IComposeState {
  areaData: {
    style: {
      style: {
        top: number
        left: number
        width: number
        height: number
      }
    }
    components: IEditComponent[]
  }
  editor: HTMLElement
}

export const defaultState = {
  areaData: {
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    components: [],
  },
  editor: null,
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: IComposeState) => {
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
