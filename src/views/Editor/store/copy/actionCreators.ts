import { Dispatch } from 'redux'
import { ComponentType } from 'react'
import toast from 'Src/utils/message'
import store, { IRootDefaultState } from 'Src/store'

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

export const copyDispatch = () => {
  return (dispatch: Dispatch) => {
    const state = store.getState()
    const { edit } = (state as IRootDefaultState).get('editor')
    const { curComponent, curComponentIndex } = edit
    if (curComponent) {
      const copyData = { data: deepCopy(curComponent), index: curComponentIndex }
      dispatch(copy(copyData))
      dispatch(cut(false))
    }
  }
}

export const pasteDispatch = (isMouse?: boolean) => (dispatch: Dispatch) => {
  const state = store.getState()
  const { edit, copy, contextmenu } = (state as IRootDefaultState).get('editor')
  const { curComponent } = edit
  if (!curComponent) {
    toast('请选择组件')
  }

  const { copyData, isCut } = copy
  const { menuLeft, menuTop } = contextmenu
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
  addComponentDispatch({ component: data, index })
  if (isCut) {
    dispatch(copy(null))
  }
}

export const cutDispatch = () => {
  return (dispatch: Dispatch) => {
    const state = store.getState()
    const { edit, copy } = (state as IRootDefaultState).get('editor')
    const { curComponent, curComponentIndex } = edit
    const { copyData } = copy
    if (!curComponent) {
      toast('请选择组件')
    }
    if (copyData) {
      const data: ComponentType | any = deepCopy(copyData.data)
      const { index } = copyData
      data.id = generateId()
      addComponentDispatch({ component: data, index })
      if (curComponentIndex && curComponentIndex >= index) {
        // 如果当前组件索引大于等于插入索引，需要加一，因为当前组件往后移了一位
        setCurComponentIndex(curComponentIndex + 1)
      }
    }
    copyDispatch()
    deleteComponentDispatch()
    dispatch(cutState(true))
  }
}
