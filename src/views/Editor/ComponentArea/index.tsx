import React, { FC, memo, useState, useEffect, useRef } from 'react'
import LeftTabs from './LeftTabs'

import renderComponentAreaData from '../../../customComponents'

import './index.less'

const ComponentArea: FC = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)
  const [height, setHeight] = useState(0)
  const componentAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (componentAreaRef !== null && componentAreaRef.current !== null) {
      const { offsetHeight } = componentAreaRef.current
      setHeight(offsetHeight)
    }
  }, [])

  return (
    <div className='editor-component-area' ref={componentAreaRef}>
      {/* component area */}
      <LeftTabs tabsData={renderComponentAreaData} height={height} />
    </div>
  )
}

export default memo(ComponentArea)
