/* eslint-disable radix */
import React, { FC, memo, useState, useEffect, useRef, PropsWithChildren, ReactNode } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, RedoOutlined } from '@ant-design/icons'
import { IEditComponent } from '../../types'
import { IRootDefaultState } from '../../../../store'
import { IEditStore } from '../../store'
import { mod360 } from '../../utils/translate'
import eventBus from '../../utils/eventBus'
import runAnimation from '../../utils/runAnimation'
import { hideContextMenu } from '../../store/contextmenu/actionCreators'
import {
  setClickComponentStatusDispatch,
  setShapeStyleByDispatch,
  setCurComponentAndComponentIndexDispatch,
} from '../../store/edit/actionCreators'
import calculateComponentPositionAndSize from '../../utils/calculateComponentPositionAndSize'
import { recordSnapshotDispatch } from '../../store/snapshot/actionCreators'

import './index.less'

interface IPoint<T> {
  lt: T
  t: T
  rt: T
  r: T
  rb: T
  b: T
  lb: T
  l: T
}
interface IPointStyle {
  marginLeft: string
  marginTop: string
  left: string
  top: string
  cursor: string
}

const pointList: (keyof IPoint<string>)[] = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'] // 八个方向

const initialAngle: IPoint<number> = {
  // 每个点对应的初始角度
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315,
}

const angleToCursor = [
  // 每个范围的角度对应的光标
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' },
]

type PageStateProps = {
  editorData: IEditStore
}

type PageDispatchProps = {
  // [propsName: string]: any
  hideContextMenuDispatch: () => void
  setClickComponentStatusDispatch: (payload: any) => void
  recordSnapshotDispatch: () => void
  setCurComponentAndComponentIndexDispatch: (payload: any) => void
  setShapeStyleByDispatch: (payload: any) => void
}

type PageOwnProps = {
  style: any
  active: boolean
  element: IEditComponent
  defaultStyle: {
    [propName: string]: any
  }
  index: number
  className: string
  children?: ReactNode
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PropsWithChildren<PageOwnProps>

const Shape: FC<IProps> = (props) => {
  const { editorData } = props
  const { curComponent } = editorData.edit
  const { editor } = editorData.compose

  const { active, element, defaultStyle, index, className, style } = props

  const {
    hideContextMenuDispatch,
    setClickComponentStatusDispatch,
    setShapeStyleByDispatch,
    recordSnapshotDispatch,
    setCurComponentAndComponentIndexDispatch,
  } = props

  const [isActive, setIsActive] = useState(false)
  const [cursors, setCursors] = useState<IPoint<string>>({
    lt: '',
    t: '',
    rt: '',
    r: '',
    rb: '',
    b: '',
    lb: '',
    l: '',
  })

  const shapeRef = useRef<HTMLDivElement>(null)

  // 处理四个点上的鼠标样式
  const getCursor: () => IPoint<string> = () => {
    const result: IPoint<string> = { lt: '', t: '', rt: '', r: '', rb: '', b: '', lb: '', l: '' }

    if (!curComponent) {
      return result
    }
    const rotate = mod360(curComponent.style.rotate) // 取余 360
    let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

    pointList.forEach((point) => {
      const angle = mod360(initialAngle[point] + rotate)
      const len = angleToCursor.length
      while (true) {
        lastMatchIndex = (lastMatchIndex + 1) % len
        const angleLimit = angleToCursor[lastMatchIndex]
        if (angle < 23 || angle >= 338) {
          result[point] = 'nw-resize'

          return
        }

        if (angleLimit.start <= angle && angle < angleLimit.end) {
          result[point] = `${angleLimit.cursor}-resize`

          return
        }
      }
    })

    return result
  }

  // 处理四个点的样式
  const getPointStyle: (point: keyof IPoint<string>) => IPointStyle = (point) => {
    const { width, height } = defaultStyle
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = Math.floor(height / 2)
      }
    }

    const style = {
      marginLeft: hasR ? '-4px' : '-4px',
      marginTop: '-4px',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: cursors[point],
    }

    return style
  }

  // NOTE: effect

  // 处理cursor的样式
  useEffect(() => {
    if (curComponent) {
      const cursors = getCursor()
      setCursors(cursors)
    }
  }, [])

  // 处理动画
  useEffect(() => {
    const runAnimationFn = () => {
      if (element === curComponent) {
        runAnimation(shapeRef.current, curComponent.animations)
      }
    }
    eventBus.addListener('runAnimation', runAnimationFn)
    return () => {
      eventBus.removeListener('runAnimation', runAnimationFn)
    }
  }, [])

  // 处理active状态
  useEffect(() => {
    if (active && !element.isLock) {
      setIsActive(true)
    }
  }, [active, element.isLock])

  useEffect(() => {
    console.log('curComponent', curComponent)
  }, [curComponent])

  // Group组件放大缩小时, 锁定比例
  const isNeedLockProportion = () => {
    if (element.component !== 'Group') return false
    const ratates = new Set([0, 90, 180, 360])
    if (typeof element.propValue !== 'string' && typeof element.propValue !== 'number') {
      element.propValue.forEach((item: IEditComponent) => {
        if (!ratates.has(mod360(Number.parseInt(item.style.rotate)))) {
          return true
        }
      })
    }
    return false
  }

  // 选择当前组件
  const selectCurComponent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 阻止向父组件冒泡
    e.stopPropagation()
    e.preventDefault()
    hideContextMenuDispatch()
  }

  // shape上的mouseDown事件
  const handleMouseDownOnShape = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 设置组件点击状态
    setClickComponentStatusDispatch(true)

    if (element.component !== 'w-text' && element.component !== 'rect-shape') {
      e.preventDefault()
    }
    e.stopPropagation()

    // 设置当前组件和当前组件的索引
    setCurComponentAndComponentIndexDispatch({ component: element, index })

    if (element.isLock) return

    // 根据旋转角度获取光标位置
    const cursors = getCursor()
    setCursors(cursors)

    const pos = { ...defaultStyle }

    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top)
    const startLeft = Number(pos.left)

    // 如果元素没有移动，则不保存快照
    let hasMove = false

    const move = (moveEvent: MouseEvent) => {
      hasMove = true
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      pos.top = curY - startY + startTop
      pos.left = curX - startX + startLeft
      console.log('pos', pos.top, pos.left)

      // 修改当前组件样式
      setShapeStyleByDispatch(pos)
      // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
      // 如果不使用下一个执行帧，吸附后将无法移动
      // setTimeout(() => {
      // 触发元素移动事件，用于显示标线、吸附功能
      // 后面两个参数代表鼠标移动方向
      // curY - startY > 0 true 表示向下移动 false 表示向上移动
      // curX - startX > 0 true 表示向右移动 false 表示向左移动
      eventBus.emit('move', curY - startY > 0, curX - startX > 0)
      // }, 0)
    }

    const up = () => {
      hasMove && recordSnapshotDispatch()
      // 触发元素停止移动事件，用于隐藏标线
      eventBus.emit('unmove')
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // 处理旋转
  const handleRotate = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setClickComponentStatusDispatch(true)
    e.preventDefault()
    e.stopPropagation()
    // 初始坐标和初始角度
    const pos = { ...defaultStyle }
    const startY = e.clientY
    const startX = e.clientX
    const startRotate = pos.rotate

    // 获取元素中心点位置
    const rect = (shapeRef.current as HTMLDivElement).getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // 旋转前的角度
    const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

    // 如果元素没有移动，则不保存快照
    let hasMove = false
    const move = (moveEvent: MouseEvent) => {
      hasMove = true
      const curX = moveEvent.clientX
      const curY = moveEvent.clientY
      // 旋转后的角度
      const rotateDegreeAfter = Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)
      // 获取旋转的角度值
      pos.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore
      // 修改当前组件样式
      setShapeStyleByDispatch(pos)
    }

    const up = () => {
      hasMove && recordSnapshotDispatch()
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      // 根据旋转角度获取光标位置
      const cursors = getCursor()
      setCursors(cursors)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // 处理point上的mouseDown事件
  const handleMouseDownOnPoint = (point: keyof IPoint<string>, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClickComponentStatusDispatch(true)
    e.stopPropagation()
    e.preventDefault()

    const style = { ...defaultStyle }

    // 组件宽高比
    const proportion = style.width / style.height

    // 组件中心点
    const center = {
      x: style.left + style.width / 2,
      y: style.top + style.height / 2,
    }

    // 获取画布位移信息
    const editorRectInfo = editor ? editor.getBoundingClientRect() : { left: 0, top: 0 }

    // 当前点击坐标
    const curPoint = {
      x: e.clientX - editorRectInfo.left,
      y: e.clientY - editorRectInfo.top,
    }

    // 获取对称点的坐标
    const symmetricPoint = {
      x: center.x - (curPoint.x - center.x),
      y: center.y - (curPoint.y - center.y),
    }

    // 是否需要保存快照
    let needSave = false
    let isFirst = true

    const needLockProportion = isNeedLockProportion()

    const move = (moveEvent: MouseEvent) => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      if (isFirst) {
        isFirst = false
        return
      }

      needSave = true

      const curPositon = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top,
      }
      calculateComponentPositionAndSize(point, style, curPositon, proportion, needLockProportion, {
        center,
        curPoint,
        symmetricPoint,
      })

      setShapeStyleByDispatch(style)
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      needSave && recordSnapshotDispatch()
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  return (
    <div
      role='contentinfo'
      className={`shape ${active ? 'active' : ''} ${className}`}
      style={style}
      ref={shapeRef}
      onClick={selectCurComponent}
      onMouseDown={handleMouseDownOnShape}
    >
      {active && !element.isLock && (
        <span role='contentinfo' className='iconfont icon-xiangyouxuanzhuan' onMouseDown={handleRotate}>
          <RedoOutlined />
        </span>
      )}
      {isActive && (
        <span role='contentinfo' className='iconfont icon-xiangyouxuanzhuan' onMouseDown={handleRotate}>
          <RedoOutlined />
        </span>
      )}
      {element.isLock && (
        <span className='iconfont icon-suo'>
          <LockOutlined />
        </span>
      )}
      {isActive &&
        pointList.map((item) => {
          return (
            <div
              role='contentinfo'
              className='shape-point'
              onMouseDown={(e) => {
                handleMouseDownOnPoint(item, e)
              }}
              key={item}
              style={getPointStyle(item)}
            />
          )
        })}
      {props.children}
    </div>
  )
}
export default connect(
  (state: IRootDefaultState) => ({
    editorData: state.get('editor'),
  }),

  (dispatch) => ({
    hideContextMenuDispatch() {
      dispatch(hideContextMenu())
    },
    setClickComponentStatusDispatch(payload: any) {
      dispatch(setClickComponentStatusDispatch(payload) as any)
    },
    setShapeStyleByDispatch(payload: any) {
      dispatch(setShapeStyleByDispatch(payload) as any)
    },
    recordSnapshotDispatch() {
      dispatch(recordSnapshotDispatch() as any)
    },
    setCurComponentAndComponentIndexDispatch(payload: any) {
      dispatch(setCurComponentAndComponentIndexDispatch(payload) as any)
    },
  }),
)(memo(Shape))
