import React, { FC, memo, useContext } from 'react'
import { EditorContext } from '../EditorContext'

const ComponentArea: FC = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)

  return (
    <div className='editor-component-area'>
      component area
      {props.children}
    </div>
  )
}

export default memo(ComponentArea)
