import React, { FC, memo, useContext } from 'react'
import { Button, InputNumber } from 'antd'
import { EditorContext } from '../EditorContext'

import './index.less'
import { unDoDispatch } from '../store/snapshot/actionCreators'

const handleUnDo = () => {}

const handleReDo = () => {}

const handlePreview = () => {}

const handleSave = () => {}

const handleClearCanvas = () => {}

const onChangeCanvasSize = () => {}

const ToolBar: FC = () => {
  const { editorData, editorDispatch } = useContext(EditorContext)

  const { canvasStyleData } = editorData.edit

  return (
    <div className='editor-toolbar'>
      <div className='editor-toolbar-action'>
        <Button className='mr-10' onClick={handleUnDo}>
          撤销
        </Button>
        <Button className='mr-10' onClick={handleReDo}>
          重做
        </Button>
        <Button className='mr-10' onClick={handlePreview}>
          预览
        </Button>
        <Button className='mr-10' onClick={handleSave}>
          保存
        </Button>
        <Button className='mr-10' onClick={handleClearCanvas}>
          清空画布
        </Button>
      </div>
      <div className='editor-toolbar-canvas'>
        <span>画布大小: </span>
        <InputNumber min={1200} max={3840} defaultValue={canvasStyleData.width} onChange={onChangeCanvasSize} />
        *
        <InputNumber min={700} max={2160} defaultValue={canvasStyleData.height} onChange={onChangeCanvasSize} />
      </div>
    </div>
  )
}

export default memo(ToolBar)
