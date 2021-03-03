import React, { FC, memo, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { deepCopy } from '../utils'
import componentList from '../../../customComponents'

import {
  setClickComponentStatusDispatch,
  setCurComponentAndComponentIndexDispatch,
  addComponentDispatch,
} from '../store/edit/actionCreators'
import { hideContextMenu } from '../store/contextmenu/actionCreators'
import generateId from '../utils/generateId'
import { recordSnapshotDispatch } from '../store/snapshot/actionCreators'
import { IRootDefaultState } from '../../../store'
import { IEditStore } from '../store'
import EditorContainer from './EditorContainer'

import './index.less'

type PageStateProps = {
  editorData: IEditStore
}

type PageDispatchProps = {
  // [propsName: string]: any
  addComponentDispatch: (payload: any) => void
  recordSnapshotDispatch: () => void
  setClickComponentStatusDispatch: (payload: any) => void
  setCurComponentAndComponentIndexDispatch: (payload: any) => void
  hideContextMenuDispatch: () => void
}

type PageOwnProps = {
  // [propsName: string]: any
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

const CanvasArea: FC<IProps> = (props) => {
  const { editorData } = props
  const { editMode, isClickComponent } = editorData.edit
  const { currentTab } = editorData.componentArea

  const {
    addComponentDispatch,
    recordSnapshotDispatch,
    setClickComponentStatusDispatch,
    setCurComponentAndComponentIndexDispatch,
    hideContextMenuDispatch,
  } = props

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const currentTabIndex = componentList.findIndex((item) => item.label === currentTab) || 0

      const componentCategoryList = componentList[currentTabIndex].components
      const index = Number(e.dataTransfer.getData('index'))

      const component = deepCopy(componentCategoryList[index])
      component.style.top = e.nativeEvent.offsetY
      component.style.left = e.nativeEvent.offsetX
      component.id = generateId()
      addComponentDispatch({ component })
      recordSnapshotDispatch()
    },
    [currentTab],
  )

  const handleEditorContainerMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setClickComponentStatusDispatch(false)
      hideContextMenuDispatch()
      if (!isClickComponent) {
        setCurComponentAndComponentIndexDispatch({ component: null, index: null })
      }
    },
    [isClickComponent],
  )

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      hideContextMenuDispatch()
      if (!isClickComponent) {
        setCurComponentAndComponentIndexDispatch({ component: null, index: null })
      }
    },
    [isClickComponent],
  )

  return (
    <div
      role='main'
      className={`editor-canvas-area ${editMode ? 'edit' : ''}`}
      id='editor-canvas-area'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseDown={handleEditorContainerMouseDown}
      onMouseUp={handleMouseUp}
    >
      <EditorContainer />
    </div>
  )
}

export default connect(
  (state: IRootDefaultState) => ({
    editorData: state.get('editor'),
  }),
  (dispatch: Dispatch) => ({
    addComponentDispatch(payload: any) {
      dispatch(addComponentDispatch(payload) as any)
    },
    recordSnapshotDispatch() {
      dispatch(recordSnapshotDispatch() as any)
    },
    setClickComponentStatusDispatch(payload: any) {
      dispatch(setClickComponentStatusDispatch(payload) as any)
    },
    setCurComponentAndComponentIndexDispatch(payload: any) {
      dispatch(setCurComponentAndComponentIndexDispatch(payload) as any)
    },
    hideContextMenuDispatch() {
      dispatch(hideContextMenu())
    },
  }),
)(memo(CanvasArea))
