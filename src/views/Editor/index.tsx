import React, { memo, FC, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import ComponentArea from './ComponentArea'
import CanvasArea from './CanvasArea'
import { EditorProvider } from './EditorContext'
import ToolBar from './ToolBar'
import AttrArea from './AttrArea'

interface IRouteParams {
  id: string
}

const Editor: FC<RouteComponentProps<IRouteParams>> = (props) => {
  const { id } = props.match.params

  // TODO: 判断是否有id, 决定编辑器初始状态
  useEffect(() => {
    if (id) {
      // TODO: 获得组件信息
    }
  }, [id])

  return (
    <EditorProvider>
      <div className='editor-container'>
        <div className='editor-container-top'>
          <ToolBar />
        </div>
        <main className='editor-container-main'>
          <section className='left'>
            <ComponentArea />
          </section>
          <section className='center'>
            <CanvasArea />
          </section>
          <section className='right'>
            <AttrArea />
          </section>
        </main>
      </div>
    </EditorProvider>
  )
}
export default memo(withRouter(Editor))
