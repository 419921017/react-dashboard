import { produce } from 'immer'
import { Reducer } from 'redux'
import { ComponentType } from 'react'
import * as actionTypes from './constants'

type stringNumber = string | number

interface IState {
  editMode: 'edit' // 编辑器模式 edit read
  canvasStyleData: {
    // 页面全局数据, TODO: 这个有待商榷, 是否需要百分百布局
    width: stringNumber
    height: stringNumber
  }
  componentData: Array<ComponentType>
  curComponent: ComponentType | null
  curComponentZIndex: number | null
  snapshotData: Array<ComponentType> // 编辑器快照数据
  snapshotIndex: -1 // 快照索引
  menuTop: stringNumber
  menuLeft: stringNumber
  menuShow: boolean
}

export const defaultState: IState = {
  editMode: 'edit', // 编辑器模式 edit read
  canvasStyleData: {
    // 页面全局数据
    width: 1200,
    height: 740,
  },
  componentData: [],
  curComponent: null,
  curComponentZIndex: null,
  snapshotData: [], // 编辑器快照数据
  snapshotIndex: -1, // 快照索引
  menuTop: 0,
  menuLeft: 0,
  menuShow: false,
}

const reducer: Reducer = (state = defaultState, action: any) => {
  produce(state, (draft: any) => {
    switch (action.type) {
      default:
        return state
    }
  })
}

export default reducer
