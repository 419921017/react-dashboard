import { produce } from 'immer'
import { Reducer } from 'redux'
import * as actionTypes from './actionTypes'
import { IEditComponent } from '../../types'

// interface IEditComponent extends ComponentType {
//   events: any[]
//   animations: any[]
// }
export interface IEditState {
  editMode: 'edit' | 'read' // 编辑器模式 edit read
  canvasStyleData: {
    // 页面全局数据, TODO: 这个有待商榷, 是否需要百分百布局
    width: number
    height: number
    scale: number
  }
  componentData: Array<IEditComponent>
  curComponent: IEditComponent | null
  curComponentIndex: number | null
  // snapshotData: Array<ComponentType> // 编辑器快照数据
  // snapshotIndex: number // 快照索引
  // menuTop: stringNumber
  // menuLeft: stringNumber
  // menuShow: boolean
  // copyData: ComponentType | null
  isClickComponent: boolean
}

export const defaultState: IEditState = {
  editMode: 'edit', // 编辑器模式 edit read
  canvasStyleData: {
    // TODO: 这里的比例要是16:9
    // 页面全局数据
    width: 1280,
    height: 720,
    scale: 100,
  },
  componentData: [], // 画布组件数据
  curComponent: null,
  curComponentIndex: null,
  // 点击画布时是否点中组件，主要用于取消选中组件用。
  // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
  isClickComponent: false,
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: IEditState) => {
    switch (action.type) {
      case actionTypes.SET_CLICK_COMPONENT_STATUS:
        draft.isClickComponent = action.payload
        return
      case actionTypes.SET_EDIT_MODE:
        draft.editMode = action.payload
        return
      case actionTypes.SET_CANVAS_STYLE:
        draft.canvasStyleData = {
          ...state.canvasStyleData,
          ...action.payload,
        }
        return
      case actionTypes.SET_CUR_COMPONENT:
        draft.curComponent = action.payload
        return
        return
      case actionTypes.SET_CUR_COMPONENT_INDEX:
        draft.curComponentIndex = action.payload
        return
      case actionTypes.SET_SHAPE_STYLE: {
        draft.curComponent = action.payload
        return
      }
      case actionTypes.SET_SHAPE_SINGLE_STYLE: {
        const { curComponent, key, value } = action.payload
        curComponent[key] = value
        draft.curComponent = curComponent
        return
      }
      case actionTypes.SET_COMPONENT_DATA:
        console.log(actionTypes.SET_COMPONENT_DATA, action.payload)
        // TODO: 点击空白处也会改变componentData, 这后面要修复下
        if (action.payload && Object.values(action.payload).every((item) => item)) {
          draft.componentData = action.payload
        }
    }
  })

export default reducer
