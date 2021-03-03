import React, { FC, memo } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  setLockTrue,
  setLockFalse,
  setClickComponentStatusDispatch,
  deleteComponentDispatch,
  upComponentDispatch,
  downComponentDispatch,
  upComponentTopDispatch,
  downComponentBottomDispatch,
} from '../../store/edit/actionCreators'
import { IRootDefaultState } from '../../../../store'
import { IEditStore } from '../../store'

import './index.less'
import { cutDispatch, copyDispatch, pasteDispatch } from '../../store/copy/actionCreators'
import { recordSnapshotDispatch } from '../../store/snapshot/actionCreators'

type PageStateProps = {
  editorData: IEditStore
}

type PageDispatchProps = {
  setLockTrueDispatch: () => void
  setLockFalseDispatch: () => void
  setClickComponentStatusDispatch: (payload: any) => void
  cutDispatch: () => void
  copyDispatch: () => void
  pasteDispatch: (payload: any) => void
  recordSnapshotDispatch: () => void
  deleteComponentDispatch: (payload?: any) => void
  upComponentDispatch: () => void
  downComponentDispatch: () => void
  upComponentTopDispatch: () => void
  downComponentBottomDispatch: () => void
  // [propsName: string]: any
}

type PageOwnProps = {
  // [propsName: string]: any
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const ContextMenu: FC<IProps> = (props) => {
  const { editorData } = props
  const { curComponent } = editorData.edit
  const { menuShow, menuTop, menuLeft } = editorData.contextmenu

  const {
    setLockTrueDispatch,
    setLockFalseDispatch,
    setClickComponentStatusDispatch,
    cutDispatch,
    copyDispatch,
    pasteDispatch,
    recordSnapshotDispatch,
    deleteComponentDispatch,
    upComponentDispatch,
    downComponentDispatch,
    upComponentTopDispatch,
    downComponentBottomDispatch,
  } = props

  const lock = () => setLockTrueDispatch()
  const unlock = () => setLockFalseDispatch()
  const handleMouseUp = () => setClickComponentStatusDispatch(true)
  const cut = () => cutDispatch()
  const copy = () => copyDispatch()
  const paste = () => {
    pasteDispatch(true)
    recordSnapshotDispatch()
  }
  const deleteComponent = () => {
    deleteComponentDispatch()
    recordSnapshotDispatch()
  }
  const topComponent = () => {
    upComponentTopDispatch()
    recordSnapshotDispatch()
  }
  const bottomComponent = () => {
    downComponentBottomDispatch()
    recordSnapshotDispatch()
  }
  const upComponent = () => {
    upComponentDispatch()
    recordSnapshotDispatch()
  }
  const downComponent = () => {
    downComponentDispatch()
    recordSnapshotDispatch()
  }

  return (
    <>
      {menuShow && (
        <div className='contextmenu' style={{ top: `${menuTop}px`, left: `${menuLeft}px` }}>
          <ul onMouseUp={handleMouseUp}>
            {curComponent ? (
              <>
                {!curComponent.isLock ? (
                  <>
                    <li onClick={copy}>复制</li>
                    <li onClick={paste}>粘贴</li>
                    <li onClick={cut}>剪切</li>
                    <li onClick={deleteComponent}>删除</li>
                    <li onClick={lock}>锁定</li>
                    <li onClick={topComponent}>置顶</li>
                    <li onClick={bottomComponent}>置底</li>
                    <li onClick={upComponent}>上移</li>
                    <li onClick={downComponent}>下移</li>
                  </>
                ) : (
                  <li onClick={unlock}>解锁</li>
                )}
              </>
            ) : (
              <li onClick={paste}>粘贴</li>
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default connect(
  (state: IRootDefaultState) => ({ editorData: state.get('editor') }),
  (dispatch: Dispatch) => ({
    setLockTrueDispatch() {
      dispatch(setLockTrue())
    },
    setLockFalseDispatch() {
      dispatch(setLockFalse())
    },
    setClickComponentStatusDispatch(payload: any) {
      dispatch(setClickComponentStatusDispatch(payload) as any)
    },
    cutDispatch() {
      dispatch(cutDispatch() as any)
    },
    copyDispatch() {
      dispatch(copyDispatch() as any)
    },
    pasteDispatch(payload: any) {
      dispatch(pasteDispatch(payload) as any)
    },
    recordSnapshotDispatch() {
      dispatch(recordSnapshotDispatch() as any)
    },
    deleteComponentDispatch(payload?: any) {
      dispatch(deleteComponentDispatch(payload) as any)
    },
    upComponentDispatch() {
      dispatch(upComponentDispatch() as any)
    },
    downComponentDispatch() {
      dispatch(downComponentDispatch() as any)
    },
    upComponentTopDispatch() {
      dispatch(upComponentTopDispatch() as any)
    },
    downComponentBottomDispatch() {
      dispatch(downComponentBottomDispatch() as any)
    },
  }),
)(memo(ContextMenu))
