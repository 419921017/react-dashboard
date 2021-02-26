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
      case actionTypes.SET_SNAPSHOT_DATA:
        draft.snapshotData = action.payload
        return
      case actionTypes.SET_SNAPSHOT_INDEX:
        draft.snapshotIndex = action.payload

      // case actionTypes.CONTEXT_MENU_LEFT:
      //   draft.menuLeft = action.payload
      //   return
      // case actionTypes.CONTEXT_MENU_TOP:
      //   draft.menuTop = action.payload
      //   return
    }
  })

export default reducer
