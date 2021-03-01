import React, { FC, memo, useContext, useRef, useEffect } from 'react'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import SingleComponent from './SingleComponent'

import './index.less'
import { IComponentTabRender } from '../../../../customComponents'
import { EditorContext } from '../../EditorContext'
import { setActiveTab } from '../../store/componentArea/actionCreator'
import { IRootDefaultState } from '../../../../store'
import { IEditStore } from '../../store'

const { TabPane } = Tabs

const TabContent: FC<{ content: string }> = (props) => {
  return <span className='vertical-text'>{props.content}</span>
}

type PageStateProps = {
  editorData: IEditStore
}

type PageDispatchProps = {
  // [propsName: string]: any
  setActiveTabDispatch: (payload: any) => void
}
export interface PageOwnProps {
  height: number
  tabsData: IComponentTabRender[]
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  if (e.target instanceof HTMLDivElement) {
    if (e.target.dataset.index !== undefined) {
      e.dataTransfer.setData('index', e.target.dataset.index)
    }
  }
}

const LeftTabs: FC<IProps> = (props) => {
  const { editorData } = props
  const { currentTab } = editorData.componentArea

  const { tabsData = [], height } = props

  const { setActiveTabDispatch } = props

  const mode = 'left'

  const handleChangeTabActive = (activeKey: string) => {
    setActiveTabDispatch(activeKey)
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

export default connect(
  (state: IRootDefaultState) => ({
    editorData: state.get('editor'),
  }),
  (dispatch: Dispatch) => ({
    setActiveTabDispatch(payload: any) {
      dispatch(setActiveTab(payload))
    },
  }),
)(memo(LeftTabs))
