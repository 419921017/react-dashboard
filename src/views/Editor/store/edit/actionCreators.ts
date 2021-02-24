import { AnyAction, Dispatch } from 'redux'
import { ComponentType } from 'react'
import toast from 'Src/utils/message'
import * as actionTypes from './actionTypes'
import { IEditStore } from '..'
import { IEditComponent } from './reducer'
import { swap } from '../../utils'

// export const setSnapshotIndex = (payload: any) => ({
//   type: actionTypes.SET_SNAPSHOT_INDEX,
//   payload,
// })

export const setClickComponentStatus = (payload: any) => {
  return {
    type: actionTypes.SET_CLICK_COMPONENT_STATUS,
    payload,
  }
}

export const setEditMode = (payload: any) => {
  return {
    type: actionTypes.SET_EDIT_MODE,
    payload,
  }
}

export const setCanvasStyle = (payload: any) => {
  return {
    type: actionTypes.SET_CANVAS_STYLE,
    payload,
  }
}
// { component, index }
export const setCurComponent = (payload: any) => {
  return {
    type: actionTypes.SET_CUR_COMPONENT,
    payload,
    // {
    // component,
    // index
    // }
  }
}

export const setCurComponentIndex = (payload: any) => {
  return {
    type: actionTypes.SET_CUR_COMPONENT_INDEX,
    payload,
    // {
    // component,
    // index
    // }
  }
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

interface ISetShapeStyleByDispatch {
  (store: IEditStore, style: { top: number; left: number; width: number; height: number; rotate: number }): (
    dispatch: Dispatch,
  ) => void
}

export const setShapeStyleByDispatch: ISetShapeStyleByDispatch = (store, { top, left, width, height, rotate }) => (
  dispatch,
) => {
  const { curComponent } = store.edit
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

interface ISetShapeSingleStyleDispatch {
  (store: IEditStore, params: { key: string; value: any }): (dispatch: Dispatch) => void
}

export const setShapeSingleStyleDispatch: ISetShapeSingleStyleDispatch = (store, params) => (dispatch) => {
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

interface IAddComponentDispatch {
  (store: IEditStore, params: { component: IEditComponent; index?: number }): (dispatch: Dispatch) => void
}

export const addComponentDispatch: IAddComponentDispatch = (store, params) => (dispatch) => {
  const { componentData } = store.edit
  const { index, component } = params

  const componentDataCopy = componentData.slice()

  if (index !== undefined) {
    componentDataCopy.splice(index, 0, component)
  } else {
    componentDataCopy.push(component)
  }
  dispatch(setComponentData(componentDataCopy))
}

interface IDeleteComponentDispatch {
  (store: IEditStore, index?: number): (dispatch: Dispatch) => void
}

export const deleteComponentDispatch: IDeleteComponentDispatch = (store, index) => (dispatch) => {
  if (index === undefined && store.edit.curComponentIndex) {
    index = store.edit.curComponentIndex
  }
  const componentDataCopy = store.edit.componentData.slice().splice(index as number, 1)
  dispatch(setComponentData(componentDataCopy))
}

// export const unDo = (state: IEditStore) => {
//   return (dispatch: Dispatch) => {
//     if (state.snapshotIndex >= 0) {
//       dispatch(setSnapshotIndex(state.snapshotIndex--))
//       dispatch(setComponentData(cloneDeep(state.snapshotData[state.snapshotIndex])))
//     }
//   }
// }

// NOTE: animation
export const addAnimationDispatch = (store: IEditStore, animation: string) => (dispatch: Dispatch) => {
  const { curComponent } = store.edit
  if (curComponent) {
    curComponent.animations.push(animation)
    const curComponentByAnimation = curComponent
    dispatch(setCurComponent(curComponentByAnimation))
  }
}

export const removeAnimationDispatch = (store: IEditStore, index: number) => (dispatch: Dispatch) => {
  const { curComponent } = store.edit
  if (curComponent) {
    curComponent.animations.splice(index, 1)
    const curComponentByAnimation = curComponent
    dispatch(setCurComponent(curComponentByAnimation))
  }
}

// NOTE: event
export const addEventDispatch = (store: IEditStore, params: { eventName: string; param: any }) => (
  dispatch: Dispatch,
) => {
  const { curComponent } = store.edit
  if (curComponent) {
    const { eventName, param } = params
    curComponent.events[eventName] = param
    const curComponentByEvent = curComponent
    dispatch(setCurComponent(curComponentByEvent))
  }
}
export const removeEventDispatch = (store: IEditStore, eventName: string) => (dispatch: Dispatch) => {
  const { curComponent } = store.edit
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
export const upComponentDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
  const { componentData, curComponentIndex } = store.edit
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
export const downComponentDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
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
export const upComponentTopDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
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
