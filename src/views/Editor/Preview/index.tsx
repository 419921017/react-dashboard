import React, { FC, memo, useContext } from 'react'
import { EditorContext } from '../EditorContext'

const Preview: FC = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)

  return (
    <div className='editor-preview'>
      preview
      {props.children}
    </div>
  )
}

export default memo(Preview)
