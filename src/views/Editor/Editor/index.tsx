import React, { memo, FC, useEffect, useContext, createContext, useReducer } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Action } from 'redux'
import reducer, { defaultState, IState } from '../store/reducer'

import ComponentArea from '../ComponentArea'
import CanvasArea from '../CanvasArea'
import { EditorContext, EditorProvider } from '../EditorContext'
import ToolBar from '../ToolBar'
import AttrArea from '../AttrArea'
import * as actions from '../store/actionCreators'

import './index.less'

interface IRouteParams {
  id?: string
}

const Editor: FC<RouteComponentProps<IRouteParams>> = (props) => {
  const { editorData, editorDispatch } = useContext(EditorContext)

  const { id } = props.match.params

  // TODO: 判断是否有id, 决定编辑器初始状态
  useEffect(() => {
    if (id) {
      // 切换组件状态
      editorDispatch(actions.setEditMode('edit'))
      // setEditMode
      // TODO: 获得组件信息
    } else {
      editorDispatch(actions.setEditMode('read'))
    }
  }, [id])

  return (
    <div className='editor-container'>
      <div className='editor-container-top'>
        <ToolBar />
      </div>
      <main className='editor-container-main'>
        <section className='editor-container-main-left'>
          <ComponentArea />
        </section>
        <section className='editor-container-main-center'>
          <CanvasArea />
        </section>
        <section className='editor-container-main-right'>
          <AttrArea />
        </section>
      </main>
    </div>
  )
}

export default memo(withRouter(Editor))
