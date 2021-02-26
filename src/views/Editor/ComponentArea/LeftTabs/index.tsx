import React, { FC, memo, useContext, useRef, useEffect } from 'react'
import { Tabs } from 'antd'
import Scroll from '../../../../baseUI/Scroll'
import SingleComponent from './SingleComponent'

import './index.less'
import { IComponentTabRender } from '../../../../customComponents'
import { EditorContext } from '../../EditorContext'
import { setActiveTab } from '../../store/componentArea/actionCreator'

const { TabPane } = Tabs

const TabContent: FC<{ content: string }> = (props) => {
  return <span className='vertical-text'>{props.content}</span>
}

export interface ILeftTabs {
  height: number
  tabsData: IComponentTabRender[]
}

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  if (e.target instanceof HTMLDivElement) {
    if (e.target.dataset.index !== undefined) {
      e.dataTransfer.setData('index', e.target.dataset.index)
    }
  }
}

const LeftTabs: FC<ILeftTabs> = (props) => {
  const { editorData, editorDispatch } = useContext(EditorContext)

  const { currentTab } = editorData.componentArea

  const { tabsData = [], height } = props

  const mode = 'left'

  const handleChangeTabActive = (activeKey: string) => {
    editorDispatch(setActiveTab(activeKey))
  }

  return (
    <div className='left-tabs-content'>
      <Tabs
        defaultActiveKey='0'
        activeKey={`${currentTab}`}
        onChange={handleChangeTabActive}
        tabPosition={mode}
        style={{ height: '100%' }}
        tabBarGutter={0}
      >
        {tabsData.map((tab, i) => (
          <TabPane
            style={{ paddingLeft: 0, height: `${height}px` }}
            tab={TabContent({ content: tab.label })}
            key={tab.label}
          >
            <div className='component-container' onDragStart={(e) => handleDragStart(e)}>
              {tab.components.map((component, index) => {
                const { label, componentName } = component
                const key = index + label + componentName
                return <SingleComponent {...component} key={key} draggable dataIndex={index} />
              })}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default memo(LeftTabs)
