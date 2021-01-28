import { produce } from 'immer'
import { Reducer } from 'redux'
import { ComponentType } from 'react'
import * as actionTypes from './constants'

type stringNumber = string | number

export interface IState {
  editMode: 'edit' | 'read' // 编辑器模式 edit read
  canvasStyleData: {
    // 页面全局数据, TODO: 这个有待商榷, 是否需要百分百布局
    width: number
    height: number
  }
  componentData: Array<ComponentType>
  curComponent: ComponentType | null
  curComponentIndex: number | null
  snapshotData: Array<ComponentType> // 编辑器快照数据
  snapshotIndex: -1 // 快照索引
  menuTop: stringNumber
  menuLeft: stringNumber
  menuShow: boolean
  copyData: ComponentType | null
}

export const defaultState: IState = {
  editMode: 'edit', // 编辑器模式 edit read
  canvasStyleData: {
    // TODO: 这里的比例要是16:9
    // 页面全局数据
    width: 1280,
    height: 720,
  },
  componentData: [], // 画布组件数据
  curComponent: null,
  curComponentIndex: null,
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1, // 快照索引
  menuTop: 0, // 右击菜单数据
  menuLeft: 0,
  menuShow: false,
  copyData: null, // 复制粘贴剪切
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: IState) => {
    switch (action.type) {
      case actionTypes.SET_EDIT_MODE:
        draft.editMode = action.payload
        console.log('draft', draft)
        return
      case actionTypes.SET_SNAPSHOT_INDEX:
        draft.snapshotIndex = action.payload
        console.log('draft', draft)
        return
      case actionTypes.SET_COMPONENT_DATA:
        draft.componentData = action.payload
        console.log('draft', draft)
        return
      default:
        return state
    }
  })

export default reducer
