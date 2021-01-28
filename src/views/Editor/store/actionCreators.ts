import { Dispatch } from 'redux'
import { cloneDeep } from 'lodash'
import * as actionTypes from './constants'
import { IState } from './reducer'

export const setEditMode = (payload: any) => ({
  type: actionTypes.SET_EDIT_MODE,
  payload,
})

export const setSnapshotIndex = (payload: any) => ({
  type: actionTypes.SET_SNAPSHOT_INDEX,
  payload,
})

export const setComponentData = (payload: any) => ({
  type: actionTypes.SET_COMPONENT_DATA,
  payload,
})

export const unDo = (state: IState) => {
  return (dispatch: Dispatch) => {
    if (state.snapshotIndex >= 0) {
      dispatch(setSnapshotIndex(state.snapshotIndex--))
      dispatch(setComponentData(cloneDeep(state.snapshotData[state.snapshotIndex])))
    }
  }
}
