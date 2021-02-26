import { Dispatch } from 'redux'
import { ComponentType } from 'react'
import toast from 'Src/utils/message'
import * as actionTypes from './actionTypes'
import { deepCopy } from '../../utils'
import { IEditStore } from '..'
import generateId from '../../utils/generateId'
import { addComponentDispatch, setCurComponentIndex, deleteComponentDispatch } from '../edit/actionCreators'

export const copy = (payload: any) => ({
  type: actionTypes.COPY,
  payload,
})

export const paste = (payload: any) => ({
  type: actionTypes.PASTE,
  payload,
})

export const cut = (payload: any) => ({
  type: actionTypes.CUT,
  payload,
})

export const cutState = (payload: any) => ({
  type: actionTypes.CUT_STATE,
  payload,
})

export const copyDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
  const { curComponent, curComponentIndex } = store.edit
  if (curComponent) {
    const copyData = { data: deepCopy(curComponent), index: curComponentIndex }
    dispatch(copy(copyData))
    dispatch(cut(false))
  }
}

export const pasteDispatch = (store: IEditStore, isMouse: boolean) => (dispatch: Dispatch) => {
  const { curComponent } = store.edit
  if (!curComponent) {
    toast('请选择组件')
  }

  const { copyData, isCut } = store.copy
  const { menuLeft, menuTop } = store.contextmenu
  const { index } = copyData
  const data: ComponentType | any = deepCopy(copyData.data)

  if (isMouse) {
    data.style.left = menuLeft
    data.style.top = menuTop
  } else {
    data.style.left += 10
    data.style.top += 10
  }
  data.id = generateId()
  addComponentDispatch(store.edit, { component: data, index })
  if (isCut) {
    dispatch(copy(null))
  }
}

export const cutDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
  const { curComponent, curComponentIndex } = store.edit
  const { copyData } = store.copy
  if (!curComponent) {
    toast('请选择组件')
  }
  if (copyData) {
    const data: ComponentType | any = deepCopy(copyData.data)
    const { index } = copyData
    data.id = generateId()
    addComponentDispatch(store.edit, { component: data, index })
    if (curComponentIndex && curComponentIndex >= index) {
      // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
      setCurComponentIndex(curComponentIndex + 1)
    }
  }
  copyDispatch(store)
  deleteComponentDispatch(store.edit)
  dispatch(cutState(true))
}
