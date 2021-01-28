import React, { FC, memo, useContext } from 'react'
import { EditorContext } from '../EditorContext'

const AttrArea: FC = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)

  return (
    <div className='editor-attr-area'>
      attr-area
      {props.children}
    </div>
  )
}

export default memo(AttrArea)
