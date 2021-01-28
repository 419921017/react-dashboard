import React, { FC, memo, useContext } from 'react'
import { EditorContext } from '../EditorContext'

const ToolBar: FC = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)

  return (
    <div className='editor-toolbar'>
      toolbar
      {props.children}
    </div>
  )
}

export default memo(ToolBar)
