import { Dispatch } from 'redux'
import * as actionTypes from './constants'

export const setEditMode = (payload: any) => ({
  type: actionTypes.SET_EDIT_MODE,
  payload,
})
