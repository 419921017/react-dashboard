import { produce } from 'immer'
import { Reducer } from 'redux'

import * as actionTypes from './actionTypes'

export interface ISnapshotState {
  snapshotData: any[] // 编辑器快照数据
  snapshotIndex: number // 快照索引
}

export const defaultState = {
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1, // 快照索引
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: ISnapshotState) => {
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
