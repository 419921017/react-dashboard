import React, { memo, FC, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import ComponentArea from '../ComponentArea'
import CanvasArea from '../CanvasArea'
import ToolBar from '../ToolBar'
import AttrArea from '../AttrArea'

import './index.less'
import { IRootDefaultState } from '../../../store'
import { setEditModeDispatch } from '../store/edit/actionCreators'

type PageStateProps = {
  // editorData: IEditStore
}

type PageDispatchProps = {
  setEditModeDispatch: (payload: string) => void
  // [propsName: string]: any
}

type PageOwnProps = {
  id?: string
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const Editor: FC<RouteComponentProps<PageOwnProps> & IProps> = (props) => {
  // const { editorData } = props
  const { setEditModeDispatch } = props

  const { id } = props.match.params

  // TODO: 判断是否有id, 决定编辑器初始状态
  useEffect(() => {
    if (id) {
      // 切换组件状态
      setEditModeDispatch('edit')
      // TODO: 获得组件信息
    } else {
      setEditModeDispatch('read')
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

export default connect(
  (state: IRootDefaultState) => ({
    editorData: state.get('editor'),
  }),
  (dispatch: Dispatch) => ({
    setEditModeDispatch(payload: string) {
      dispatch(setEditModeDispatch(payload) as any)
    },
  }),
  // actions,
)(memo(withRouter(Editor)))
