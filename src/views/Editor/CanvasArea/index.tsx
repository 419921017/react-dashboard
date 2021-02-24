import React, { FC, memo, useContext } from 'react'
import { EditorContext } from '../EditorContext'

import './index.less'

// interface ICanvasArea {}

const CanvasArea: FC = (props) => {
  const { editorData, editorDispatch } = useContext(EditorContext)
  const { editMode } = editorData.edit
  return (
    <div className={`editor-canvas-area ${editMode ? 'edit' : ''}`} id='editor-canvas-area'>
      canvas area
      {props.children}
    </div>
  )
}

export default memo(CanvasArea)
