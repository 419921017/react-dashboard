import { Dispatch } from 'redux'
import * as actionTypes from './actionTypes'
import { IEditStore } from '..'
import { deepCopy } from '../../utils'

export const setSnapshotData = (payload: any) => ({
  type: actionTypes.SET_SNAPSHOT_DATA,
  payload,
})

export const setSnapshotIndex = (payload: any) => ({
  type: actionTypes.SET_SNAPSHOT_INDEX,
  payload,
})

export const unDoDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
  const { snapshotData, snapshotIndex } = store.snapshot
  if (snapshotIndex >= 0) {
    const index = snapshotIndex - 1
    const clonedSnapshotData = deepCopy(snapshotData[index])
    dispatch(setSnapshotData(clonedSnapshotData))
  }
}
export const reDoDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
  const { snapshotData, snapshotIndex } = store.snapshot

  if (snapshotIndex < snapshotData.length - 1) {
    const index = snapshotIndex + 1
    const clonedSnapshotData = deepCopy(snapshotData[index])
    dispatch(setSnapshotData(clonedSnapshotData))
  }
}
export const recordSnapshotDispatch = (store: IEditStore) => (dispatch: Dispatch) => {
  const { componentData } = store.edit
  const { snapshotData, snapshotIndex } = store.snapshot
  const nextIndex = snapshotIndex + 1
  // 添加新的快照
  snapshotData[nextIndex] = deepCopy(componentData)
  // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
  if (snapshotIndex < nextIndex - 1) {
    const recordedSnapshotData = snapshotData.slice(0, snapshotIndex + 1)
    dispatch(setSnapshotData(recordedSnapshotData))
  }
}
