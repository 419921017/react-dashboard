import eventBus from './eventBus'
import store, { IRootDefaultState } from '../../../store'
import { copyDispatch, cutDispatch, pasteDispatch } from '../store/copy/actionCreators'
import { setLockFalse, setLockTrue, deleteComponentDispatch } from '../store/edit/actionCreators'

import { recordSnapshotDispatch, unDoDispatch, reDoDispatch } from '../store/snapshot/actionCreators'
import { decomposeDispatch, composeDispatch } from '../store/compose/actionCreators'
import { IEditStore } from '../store'

const ctrlKey = 17
const vKey = 86 // 粘贴
const cKey = 67 // 复制
const xKey = 88 // 剪切
const yKey = 89 // 重做
const zKey = 90 // 撤销
const gKey = 71 // 组合
const bKey = 66 // 拆分
const lKey = 76 // 锁定
const uKey = 85 // 解锁
const sKey = 83 // 保存
const pKey = 80 // 预览
const dKey = 68 // 删除
const deleteKey = 46 // 删除
const eKey = 69 // 清空画布

interface IKeyGather {
  ctrlKey: number
  vKey: number // 粘贴
  cKey: number // 复制
  xKey: number // 剪切
  yKey: number // 重做
  zKey: number // 撤销
  gKey: number // 组合
  bKey: number // 拆分
  lKey: number // 锁定
  uKey: number // 解锁
  sKey: number // 保存
  pKey: number // 预览
  dKey: number // 删除
  deleteKey: number // 删除
  eKey: number // 清空画布
}

export const keycodes: number[] = [66, 67, 68, 69, 71, 76, 80, 83, 85, 86, 88, 89, 90]

function copy() {
  copyDispatch()
}

function paste() {
  pasteDispatch()
  recordSnapshotDispatch()
}

function cut() {
  cutDispatch()
}

function redo() {
  reDoDispatch()
}

function undo() {
  unDoDispatch()
}

function compose() {
  const state: IEditStore = (store.getState() as IRootDefaultState).get('editor')
  const { areaData } = state.compose
  if (areaData.components.length > 0) {
    composeDispatch()
    recordSnapshotDispatch()
  }
}

function decompose() {
  const state: IEditStore = (store.getState() as IRootDefaultState).get('editor')
  const { curComponent } = state.edit
  if (curComponent && !curComponent.isLock && curComponent.component === 'Group') {
    decomposeDispatch()
    recordSnapshotDispatch()
  }
}

function save() {
  eventBus.emit('save')
}

function preview() {
  eventBus.emit('preview')
}

function deleteComponent() {
  const state: IEditStore = (store.getState() as IRootDefaultState).get('editor')
  const { curComponent } = state.edit

  if (curComponent) {
    deleteComponentDispatch()
    recordSnapshotDispatch()
  }
}

function clearCanvas() {
  eventBus.emit('clearCanvas')
}

function lock() {
  setLockTrue()
}

function unlock() {
  setLockFalse()
}

// 与组件状态无关的操作
const basemap = {
  [vKey]: paste,
  [yKey]: redo,
  [zKey]: undo,
  [sKey]: save,
  [pKey]: preview,
  [eKey]: clearCanvas,
}

// 组件锁定状态下可以执行的操作
const lockMap = {
  ...basemap,
  [uKey]: unlock,
}

// 组件未锁定状态下可以执行的操作
const unlockMap = {
  ...basemap,
  [cKey]: copy,
  [xKey]: cut,
  [gKey]: compose,
  [bKey]: decompose,
  [dKey]: deleteComponent,
  [deleteKey]: deleteComponent,
  [lKey]: lock,
}

let isCtrlDown = false

// 全局监听按键操作并执行相应命令
export function listenGlobalKeyDown() {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const state: IEditStore = (store.getState() as IRootDefaultState).get('editor')

    const { curComponent } = state.edit
    if (e.key === ctrlKey.toString()) {
      isCtrlDown = true
    } else if (e.key === deleteKey.toString() && curComponent) {
      deleteComponentDispatch()
      recordSnapshotDispatch()
    } else if (isCtrlDown) {
      if (!curComponent || !curComponent.isLock) {
        e.preventDefault()
        if ((unlockMap as any)[e.key]) {
          ;(unlockMap as any)[e.key]()
        }
      } else if (curComponent && curComponent.isLock) {
        e.preventDefault()

        if ((lockMap as any)[e.key]) {
          ;(lockMap as any)[e.key]()
        }
      }
    }
  })

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === ctrlKey.toString()) {
      isCtrlDown = false
    }
  })
}
