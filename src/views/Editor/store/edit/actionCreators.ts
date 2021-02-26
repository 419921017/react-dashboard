import { AnyAction, Action, Dispatch } from 'redux'
import toast from 'Src/utils/message'
import store, { IRootDefaultState } from 'Src/store'
import * as actionTypes from './actionTypes'
import { IEditStore } from '..'
import { IEditComponent, IEditState } from './reducer'
import { swap } from '../../utils'
import { deepCopy } from '../../../utils'

const setClickComponentStatus = (payload: string) => {
  return {
    type: actionTypes.SET_CLICK_COMPONENT_STATUS,
    payload,
  }
}

export const setClickComponentStatusDispatch = (payload: any) => (dispatch: Dispatch) => {
  dispatch(setClickComponentStatus(payload))
}

const setEditMode = (payload: string) => {
  return {
    type: actionTypes.SET_EDIT_MODE,
    payload,
  }
}

export const setEditModeDispatch = (payload: string) => (dispatch: any) => {
  dispatch(setEditMode(payload))
}

const setCanvasStyle = (payload: any) => {
  return {
    type: actionTypes.SET_CANVAS_STYLE,
    payload,
  }
}

export const setCanvasStyleDispatch = (payload: any) => (dispatch: Dispatch) => {
  dispatch(setCanvasStyle(payload))
}

// { component, index }
const setCurComponent = (payload: any) => {
  return {
    type: actionTypes.SET_CUR_COMPONENT,
    payload,
  }
}

const setCurComponentIndex = (payload: any) => {
  return {
    type: actionTypes.SET_CUR_COMPONENT_INDEX,
    payload,
  }
}

export const setCurComponentAndComponentIndexDispatch = (payload: any) => (dispatch: Dispatch) => {
  const { component, index } = payload
  dispatch(setCurComponent(component))
  dispatch(setCurComponentIndex(index))
}

interface ISetShapeStyle {
  (params: {
    curComponent: IEditComponent
    top: number
    left: number
    width: number
    height: number
    rotate: number
  }): AnyAction
}

export const setShapeStyle: ISetShapeStyle = ({ curComponent, top, left, width, height, rotate }) => {
  return {
    type: actionTypes.SET_SHAPE_STYLE,
    payload: {
      curComponent,
      style: {
        top,
        left,
        width,
        height,
        rotate,
      },
    },
  }
}

// interface ISetShapeStyleByDispatch {
//   (store: IEditStore, style: { top: number; left: number; width: number; height: number; rotate: number }): (
//     dispatch: Dispatch,
//   ) => void
// }

export const setShapeStyleByDispatch = (store: IEditStore, dispatch: Dispatch, payload: any) => {
  const { curComponent } = store.edit
  const { top, left, width, height, rotate } = payload
  if (curComponent) {
    dispatch(setShapeStyle({ curComponent, top, left, width, height, rotate }))
  }
}

interface ISetShapeSingleStyle {
  (curComponent: IEditComponent, params: { key: string; value: any }): AnyAction
}

export const setShapeSingleStyle: ISetShapeSingleStyle = (curComponent, { key, value }) => {
  return {
    type: actionTypes.SET_SHAPE_SINGLE_STYLE,
    payload: {
      curComponent,
      key,
      value,
    },
  }
}

export const setShapeSingleStyleDispatch = (store: IEditStore, dispatch: Dispatch, params: any) => {
  const { curComponent } = store.edit
  if (curComponent) {
    dispatch(setShapeSingleStyle(curComponent, params))
  }
}

export const setComponentData = (payload: any) => {
  return {
    type: actionTypes.SET_COMPONENT_DATA,
    payload,
  }
}

export const addComponentDispatch = (payload: { component: any; index?: number }) => (dispatch: Dispatch) => {
  const state = store.getState()
  // const { componentData } = edit
  const editor = (state as IRootDefaultState).get('editor')
  const { componentData } = editor.edit
  const { index, component } = payload

  const componentDataCopy = deepCopy(componentData)
  console.log('index', index)

  if (index !== undefined) {
    componentDataCopy.splice(index, 0, component)
  } else {
    componentDataCopy.push(component)
  }

  dispatch(setComponentData(componentDataCopy))
}

export const deleteComponentDispatch = (edit: IEditState, index?: number) => (dispatch: Dispatch) => {
  if (index === undefined && edit.curComponentIndex) {
    index = edit.curComponentIndex
  }
  const componentDataCopy = deepCopy(edit.componentData).splice(index as number, 1)
  dispatch(setComponentData(componentDataCopy))
}

// NOTE: animation
export const addAnimationDispatch = (edit: IEditState, animation: string) => (dispatch: Dispatch) => {
  const { curComponent } = edit
  if (curComponent) {
    curComponent.animations.push(animation)
    const curComponentByAnimation = curComponent
    dispatch(setCurComponent(curComponentByAnimation))
  }
}

export const removeAnimationDispatch = (edit: IEditState, index: number) => (dispatch: Dispatch) => {
  const { curComponent } = edit
  if (curComponent) {
    curComponent.animations.splice(index, 1)
    const curComponentByAnimation = curComponent
    dispatch(setCurComponent(curComponentByAnimation))
  }
}

// NOTE: event
export const addEventDispatch = (edit: IEditState, payload: { eventName: string; param: any }) => (
  dispatch: Dispatch,
) => {
  const { curComponent } = edit
  if (curComponent) {
    const { eventName, param } = payload
    curComponent.events[eventName] = param
    const curComponentByEvent = curComponent
    dispatch(setCurComponent(curComponentByEvent))
  }
}

export const removeEventDispatch = (edit: IEditState, eventName: string) => (dispatch: Dispatch) => {
  const { curComponent } = edit
  if (curComponent) {
    delete curComponent.events[eventName]
    const curComponentByEvent = curComponent
    dispatch(setCurComponent(curComponentByEvent))
  }
}

// NOTE: lock
export const setLockTrue = () => ({
  type: actionTypes.LOCK,
  payload: true,
})

export const setLockFalse = () => ({
  type: actionTypes.LOCK,
  payload: false,
})

// NOTE: layout
export const upComponentDispatch = (edit: IEditState) => (dispatch: Dispatch) => {
  const { componentData, curComponentIndex } = edit
  if (curComponentIndex !== null) {
    // 上移图层 index，表示元素在数组中越往后
    if (curComponentIndex < componentData.length - 1) {
      const swapedComponentData = swap(componentData, curComponentIndex, curComponentIndex + 1)
      dispatch(setComponentData(swapedComponentData))
    } else {
      toast('已经到顶了')
    }
  }
}

export const downComponentDispatch = (store: IEditStore, dispatch: Dispatch) => {
  const { componentData, curComponentIndex } = store.edit
  // 下移图层 index，表示元素在数组中越往前
  if (curComponentIndex !== null) {
    if (curComponentIndex > 0) {
      const swapedComponentData = swap(componentData, curComponentIndex, curComponentIndex - 1)
      dispatch(setComponentData(swapedComponentData))
    } else {
      toast('已经到底了')
    }
  }
}

export const upComponentTopDispatch = (store: IEditStore, dispatch: Dispatch) => {
  const { componentData, curComponentIndex } = store.edit
  if (curComponentIndex !== null) {
    // 置顶
    if (curComponentIndex < componentData.length - 1) {
      const swapedComponentData = swap(componentData, curComponentIndex, componentData.length - 1)
      dispatch(setComponentData(swapedComponentData))
    } else {
      toast('已经到顶了')
    }
  }
}
export const downComponentBottomDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
  const { componentData, curComponentIndex } = store.edit
  if (curComponentIndex !== null) {
    // 置底
    if (curComponentIndex > 0) {
      const swapedComponentData = swap(componentData, curComponentIndex, 0)
      dispatch(setComponentData(swapedComponentData))
    } else {
      toast('已经到底了')
    }
  }
}
