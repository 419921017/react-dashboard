import React, { FC, memo, useEffect, useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Component from 'Src/customComponents/Component'

import componentList from '../../../../customComponents'
import { deepCopy, $ } from '../../utils'
import { getComponentRotatedStyle, getStyle } from '../../utils/style'

import { IRootDefaultState } from '../../../../store'
import './index.less'
import { IEditStore } from '../../store'

import Grid from '../Grid'
import Shape from '../Shape'

import { showContextMenuDispatch } from '../../store/contextmenu/actionCreators'
import { setEditor, setAreaData, setAreaDataDispatch } from '../../store/compose/actionCreators'
import eventBus from '../../utils/eventBus'
import { IEditComponent } from '../../types'
import { setShapeStyle, setShapeStyleByDispatch } from '../../store/edit/actionCreators'

const getShapeStyle: any = (style: any) => {
  const result: any = {}
  ;['width', 'height', 'top', 'left', 'rotate'].forEach((attr) => {
    if (attr !== 'rotate') {
      result[attr] = `${style[attr]}px`
    } else {
      result.transform = `rotate(${style[attr]}deg)`
    }
  })

  return result
}

const getComponentStyle = (style: any) => {
  return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
}

const getTextareaHeight = (element: any, text: string) => {
  let { lineHeight } = element.style
  const { fontSize, height } = element.style
  if (lineHeight === '') {
    lineHeight = 1.5
  }
  const newHeight = (text.split('<br>').length - 1) * lineHeight * fontSize
  return height > newHeight ? height : newHeight
}

type PageStateProps = {
  editorData: IEditStore
}

type PageDispatchProps = {
  showContextMenuDispatch: (point: { top: number; left: number }) => void
  setEditorDispatch: (el: string) => void
  setAreaDataDispatch: (payload: any) => void
  setShapeStyleByDispatch: (payload: any) => void
  // [propsName: string]: any
}

type PageOwnProps = {
  // [propsName: string]: any
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const EditorContainer: FC<IProps> = (props) => {
  const { editorData } = props
  const { editMode, canvasStyleData, curComponent, componentData, curComponentIndex } = editorData.edit
  const { editor } = editorData.compose

  const { showContextMenuDispatch, setEditorDispatch, setAreaDataDispatch, setShapeStyleByDispatch } = props

  const [editorX, setEditorX] = useState(0)
  const [editorY, setEditorY] = useState(0)
  const [start, setStart] = useState({
    x: 0,
    y: 0,
  })

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [isShowArea, setIsShowArea] = useState(false)

  const hideArea = () => {
    setWidth(0)
    setHeight(0)
    setIsShowArea(false)
  }

  const getSelectArea: () => IEditComponent[] = () => {
    const result: IEditComponent[] = []
    // 区域起点坐标
    const { x, y } = start
    // 计算所有的组件数据，判断是否在选中区域内
    componentData.forEach((component) => {
      if (component.isLock) return

      const { left, top, width, height } = component.style
      if (x <= left && y <= top && left + width <= x + width && top + height <= y + height) {
        result.push(component)
      }
    })

    // 返回在选中区域内的所有组件
    return result
  }

  const createGroup = () => {
    // 获取选中区域的组件数据
    const areaData = getSelectArea()
    if (areaData.length <= 1) {
      return hideArea()
    }
    // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
    // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
    let top = Infinity
    let left = Infinity
    let right = -Infinity
    let bottom = -Infinity
    areaData.forEach((component) => {
      let style = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }
      if (component.component === 'Group') {
        if (typeof component.propValue !== 'string' && typeof component.propValue !== 'number') {
          component.propValue.forEach((item: IEditComponent) => {
            const rectInfo = $(`#component${item.id}`).getBoundingClientRect()
            style.left = rectInfo.left - editorX
            style.top = rectInfo.top - editorY
            style.right = rectInfo.right - editorX
            style.bottom = rectInfo.bottom - editorY

            if (style.left < left) left = style.left
            if (style.top < top) top = style.top
            if (style.right > right) right = style.right
            if (style.bottom > bottom) bottom = style.bottom
          })
        }
      } else {
        style = getComponentRotatedStyle(component.style)
      }

      if (style.left < left) left = style.left
      if (style.top < top) top = style.top
      if (style.right > right) right = style.right
      if (style.bottom > bottom) bottom = style.bottom
    })
    setStart({
      x: left,
      y: top,
    })
    setWidth(right - left)
    setHeight(bottom - top)

    // 设置选中区域位移大小信息和区域内的组件数据
    setAreaDataDispatch({
      style: {
        left,
        top,
        width,
        height,
      },
      components: areaData,
    })
  }

  const handleInput = (element: any, value: string) => {
    // 根据文本组件高度调整 shape 高度
    setShapeStyleByDispatch({
      height: getTextareaHeight(element, value),
    })
  }

  useEffect(() => {
    // 注册编辑器
    setEditorDispatch('#editor')
    // hideArea
    eventBus.addListener('hideArea', () => {
      hideArea()
    })
  }, [])

  const handleEditorContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()

    // 计算菜单相对于编辑器的位移
    let target = e.currentTarget
    let top = e.nativeEvent.offsetY
    let left = e.nativeEvent.offsetX

    while (target instanceof SVGElement) {
      if (target.parentNode) {
        target = target.parentNode as HTMLElement
      }
    }

    while (!target.className.includes('editor')) {
      if (target.parentNode) {
        left += target.offsetLeft
        top += target.offsetTop
        target = target.parentNode as HTMLElement
      }
    }

    showContextMenuDispatch({ top, left })
  }

  const handleEditorMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
    if (!curComponent || (curComponent.component !== 'w-text' && curComponent.component !== 'rect-shape')) {
      e.preventDefault()
    }
    // e.stopPropagation()
    hideArea()
    if (editor) {
      const rectInfo = editor.getBoundingClientRect()
      setEditorX(rectInfo.x)
      setEditorY(rectInfo.y)

      const startX = e.clientX
      const startY = e.clientY
      setStart({
        x: startX - editorX,
        y: startY - editorY,
      })

      // 展示选中区域
      setIsShowArea(true)

      const move = (moveEvent: MouseEvent) => {
        const width = Math.abs(moveEvent.clientX - startX)
        const height = Math.abs(moveEvent.clientY - startY)
        setWidth(width)
        setHeight(height)

        if (moveEvent.clientX < startX) {
          setStart({
            ...start,
            x: moveEvent.clientX - editorX,
          })
        }
        if (moveEvent.clientX < startX) {
          setStart({
            ...start,
            y: moveEvent.clientY - editorY,
          })
        }
      }
      const up = (e: MouseEvent) => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)

        if (e.clientX === startX && e.clientY === startY) {
          hideArea()
          return
        }

        createGroup()
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }
  }

  return (
    <div
      role='main'
      className={`editor ${editMode}`}
      id='editor'
      style={{
        width: canvasStyleData.width,
        height: canvasStyleData.height,
        transform: `scale(${canvasStyleData.scale / 100})`,
      }}
      onContextMenu={handleEditorContextMenu}
      onMouseDown={handleEditorMouseDown}
    >
      <Grid />
      {componentData.map((item, index) => {
        const style = getComponentStyle(item.style)
        const { propValue } = item
        const element = item
        const id = `component${item.id}`
        const className = 'component'
        const propsVale = {
          style,
          propValue,
          element,
          id,
          className,
        }
        return (
          <Shape
            defaultStyle={item.style}
            style={style}
            key={id}
            active={item === curComponent}
            element={element}
            index={index}
            className={item.isLock ? 'lock' : ''}
          >
            {item.component !== 'w-text' ? (
              <Component {...propsVale} />
            ) : (
              <Component {...propsVale} handleInput={handleInput} />
            )}
          </Shape>
        )
      })}
    </div>
  )
}

export default connect(
  (state: IRootDefaultState) => ({
    editorData: state.get('editor'),
  }),
  (dispatch: Dispatch) => ({
    setEditorDispatch(payload: string) {
      dispatch(setEditor(payload))
    },
    showContextMenuDispatch,
    setAreaDataDispatch,
    setShapeStyleByDispatch,
  }),
)(memo(EditorContainer))
