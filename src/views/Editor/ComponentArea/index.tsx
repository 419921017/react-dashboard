import React, { FC, memo, useState, useEffect } from 'react'
import LeftTabs from './LeftTabs'

import './index.less'

const ComponentArea: FC = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)
  const [tabsData, setTabsData] = useState<any[]>([])

  useEffect(() => {
    const tabs = [...Array.from({ length: 30 }, (v, i) => i)]
    setTabsData(tabs)
  }, [])

  return (
    <div className='editor-component-area'>
      {/* component area */}
      {props.children}
      <LeftTabs tabsData={tabsData} />
    </div>
  )
}

export default memo(ComponentArea)
