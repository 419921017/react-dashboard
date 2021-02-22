import React, { FC, memo, useContext } from 'react'
import { Tabs, Radio } from 'antd'

import './index.less'
import { padEnd } from 'lodash'

const { TabPane } = Tabs

const TabContent: FC<{ content: string }> = (props) => {
  return <span className='vertical-text'>{props.content}</span>
}

export type tabsData = any[]

export interface ILeftTabs {
  tabsData: tabsData
}

const LeftTabs: FC<ILeftTabs> = (props) => {
  // const { editorData, editorDispatch } = useContext(EditorContext)
  const { tabsData = [] } = props
  const mode = 'left'

  return (
    <div className='left-tabs-content'>
      <Tabs defaultActiveKey='1' tabPosition={mode} style={{ height: '100%' }} tabBarGutter={8}>
        {tabsData.map((i) => (
          <TabPane tab={TabContent({ content: `Tab-${i}` })} key={i} disabled={i === 28}>
            Content of tab {i}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default memo(LeftTabs)
