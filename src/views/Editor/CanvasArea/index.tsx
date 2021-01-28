import React, { FC, memo, useContext } from 'react'
import { EditorContext } from '../EditorContext'

const CanvasArea: FC = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)

  return (
    <div className='editor-canvas-area'>
      canvas area
      {props.children}
    </div>
  )
}

export default memo(CanvasArea)
