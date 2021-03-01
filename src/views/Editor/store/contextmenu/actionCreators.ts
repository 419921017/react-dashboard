import { Dispatch } from 'redux'
import * as actionTypes from './actionTypes'

export const showContextMenu = () => ({
  type: actionTypes.SHOW_CONTEXT_MENU,
})

export const hideContextMenu = () => ({
  type: actionTypes.HIDE_CONTEXT_MENU,
})

export const setContextMenuLeft = (payload: any) => ({
  type: actionTypes.CONTEXT_MENU_LEFT,
  payload,
})

export const setContextMenuTop = (payload: any) => ({
  type: actionTypes.CONTEXT_MENU_TOP,
  payload,
})

export const showContextMenuDispatch = (point: { top: number; left: number }) => (dispatch: Dispatch) => {
  const { top, left } = point
  dispatch(showContextMenu())
  dispatch(setContextMenuTop(top))
  dispatch(setContextMenuLeft(left))
}
