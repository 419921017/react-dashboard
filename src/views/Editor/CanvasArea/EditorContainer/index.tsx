import React, { FC, memo, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import componentList from '../../../../customComponents'
import { deepCopy } from '../../utils'

import { IRootDefaultState } from '../../../../store'
import './index.less'
import { IEditStore } from '../../store'

import Grid from '../Grid'

type PageStateProps = {
  editorData: IEditStore
}

type PageDispatchProps = {
  // [propsName: string]: any
}

type PageOwnProps = {
  // [propsName: string]: any
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const EditorContainer: FC<IProps> = (props) => {
  const { editorData } = props
  const {
    editMode,
    canvasStyleData: { width, height, scale },
  } = editorData.edit
  const { currentTab } = editorData.componentArea

  // useEffect(() => {
  //   console.log('editorData', editorData)
  // }, [editorData])

  const handleEditorContextMenu = () => {
    console.log(currentTab)
  }

  const handleEditorMouseDown = () => {
    console.log(currentTab)
  }

  return (
    <div
      className={`editor ${editMode}`}
      id='editor'
      style={{
        width,
        height,
        transform: `scale(${scale / 100})`,
      }}
      onContextMenu={handleEditorContextMenu}
      onMouseDown={handleEditorMouseDown}
    >
      <Grid />
    </div>
  )
}

export default connect(
  (state: IRootDefaultState) => ({
    editorData: state.get('editor'),
  }),
  (dispatch: Dispatch) => ({}),
)(memo(EditorContainer))
