import { Dispatch, Action } from 'redux'
import store, { IRootDefaultState } from 'Src/store'
import * as actionTypes from './actionTypes'
import { IEditStore } from '..'
import { deepCopy } from '../../utils'
import { ISnapshotState } from './reducer'

export const setSnapshotData = (payload: any) => ({
  type: actionTypes.SET_SNAPSHOT_DATA,
  payload,
})

export const setSnapshotIndex = (payload: any) => ({
  type: actionTypes.SET_SNAPSHOT_INDEX,
  payload,
})

export const unDoDispatch = () => {
  return (dispatch: Dispatch) => {
    const state = (store.getState() as IRootDefaultState).get('editor')
    const { snapshotData, snapshotIndex } = state.snapshot
    if (snapshotIndex >= 0) {
      const index = snapshotIndex - 1
      const clonedSnapshotData = deepCopy(snapshotData[index])
      dispatch(setSnapshotData(clonedSnapshotData))
    }
  }
}
export const reDoDispatch = () => {
  return (dispatch: Dispatch) => {
    const state = (store.getState() as IRootDefaultState).get('editor')
    const { snapshotData, snapshotIndex } = state.snapshot

    if (snapshotIndex < snapshotData.length - 1) {
      const index = snapshotIndex + 1
      const clonedSnapshotData = deepCopy(snapshotData[index])
      dispatch(setSnapshotData(clonedSnapshotData))
    }
  }
}

export const recordSnapshotDispatch = () => {
  return (dispatch: Dispatch) => {
    const state = store.getState()

    const editor: IEditStore = (state as IRootDefaultState).get('editor')

    const { componentData } = editor.edit
    const { snapshotData } = editor.snapshot
    const { snapshotIndex } = editor.snapshot

    const snapshotDataCloned = deepCopy(snapshotData)

    // 记录新的快照的index
    const newSnapshotIndex = snapshotIndex + 1
    snapshotDataCloned[newSnapshotIndex] = deepCopy(componentData)
    dispatch(setSnapshotIndex(newSnapshotIndex))

    // 添加新的快照
    // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
    if (newSnapshotIndex < snapshotDataCloned.length - 1) {
      const recordedSnapshotData = snapshotDataCloned.slice(0, newSnapshotIndex + 1)
      dispatch(setSnapshotData(recordedSnapshotData))
    } else {
      dispatch(setSnapshotData(snapshotDataCloned))
    }
  }
}
