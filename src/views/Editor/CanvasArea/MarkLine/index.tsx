import React, { FC, memo, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { IRootDefaultState } from '../../../../store'
import { IEditStore } from '../../store'
import eventBus from '../../utils/eventBus'
import { getComponentRotatedStyle } from '../../utils/style'
import { setShapeSingleStyleDispatch } from '../../store/edit/actionCreators'

type lineType = {
  xt: boolean
  xc: boolean
  xb: boolean
  yl: boolean
  yc: boolean
  yr: boolean
}

const lines: (keyof lineType)[] = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']

const diff = 3

const isNearly = (dragValue: number, targetValue: number) => {
  return Math.abs(dragValue - targetValue) <= diff
}

type PageStateProps = {
  editorData: IEditStore
}

type PageDispatchProps = {
  // [propsName: string]: any
  setShapeSingleStyleDispatch: (payload: any) => void
}

type PageOwnProps = {
  // [propsName: string]: any
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const MarkLine: FC<IProps> = (props) => {
  const { editorData } = props
  const { curComponent, componentData } = editorData.edit

  const [lineStatus, setLineStatus] = useState<lineType>({
    xt: false,
    xc: false,
    xb: false,
    yl: false,
    yc: false,
    yr: false,
  })
  const lineRefs = useRef<any[]>([])

  const translateCurComponentShift = (key: string, condition: any, curComponentStyle: any) => {
    if (curComponent) {
      const { width, height } = curComponent.style
      if (key === 'top') {
        return Math.round(condition.dragShift - (height - curComponentStyle.height) / 2)
      }

      return Math.round(condition.dragShift - (width - curComponentStyle.width) / 2)
    }
  }

  const chooseTheTureLine = (needToShow: any, isDownward: any, isRightward: any) => {
    // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
    // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
    if (isRightward) {
      if (needToShow.includes('yr')) {
        setLineStatus({
          ...lineStatus,
          yr: true,
        })
      } else if (needToShow.includes('yc')) {
        setLineStatus({
          ...lineStatus,
          yc: true,
        })
      } else if (needToShow.includes('yl')) {
        setLineStatus({
          ...lineStatus,
          yl: true,
        })
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (needToShow.includes('yl')) {
        setLineStatus({
          ...lineStatus,
          yl: true,
        })
      } else if (needToShow.includes('yc')) {
        setLineStatus({
          ...lineStatus,
          yc: true,
        })
      } else if (needToShow.includes('yr')) {
        setLineStatus({
          ...lineStatus,
          yl: true,
        })
      }
    }

    if (isDownward) {
      if (needToShow.includes('xb')) {
        setLineStatus({
          ...lineStatus,
          xb: true,
        })
      } else if (needToShow.includes('xc')) {
        setLineStatus({
          ...lineStatus,
          xc: true,
        })
      } else if (needToShow.includes('xt')) {
        setLineStatus({
          ...lineStatus,
          xt: true,
        })
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (needToShow.includes('xt')) {
        setLineStatus({
          ...lineStatus,
          xt: true,
        })
      } else if (needToShow.includes('xc')) {
        setLineStatus({
          ...lineStatus,
          xc: true,
        })
      } else if (needToShow.includes('xb')) {
        setLineStatus({
          ...lineStatus,
          xb: true,
        })
      }
    }
  }

  const hideLine = () => {
    Object.keys(lineStatus).forEach((line) => {
      setLineStatus({
        ...lineStatus,
        [line]: false,
      })
    })
  }

  const showLine = (isDownward: any, isRightward: any) => {
    if (!curComponent) {
      return
    }
    const lines = lineRefs as any
    console.log('lines', lines)

    const components = componentData
    const curComponentStyle = getComponentRotatedStyle(curComponent.style)
    const curComponentHalfwidth = curComponentStyle.width / 2
    const curComponentHalfHeight = curComponentStyle.height / 2

    hideLine()
    components.forEach((component) => {
      if (component === curComponent) return
      const componentStyle = getComponentRotatedStyle(component.style)
      const { top, left, bottom, right } = componentStyle
      const componentHalfwidth = componentStyle.width / 2
      const componentHalfHeight = componentStyle.height / 2

      const conditions = {
        top: [
          {
            isNearly: isNearly(curComponentStyle.top, top),
            lineNode: lines.xt[0], // xt
            line: 'xt',
            dragShift: top,
            lineShift: top,
          },
          {
            isNearly: isNearly(curComponentStyle.bottom, top),
            lineNode: lines.xt[0], // xt
            line: 'xt',
            dragShift: top - curComponentStyle.height,
            lineShift: top,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
            lineNode: lines.xc[0], // xc
            line: 'xc',
            dragShift: top + componentHalfHeight - curComponentHalfHeight,
            lineShift: top + componentHalfHeight,
          },
          {
            isNearly: isNearly(curComponentStyle.top, bottom),
            lineNode: lines.xb[0], // xb
            line: 'xb',
            dragShift: bottom,
            lineShift: bottom,
          },
          {
            isNearly: isNearly(curComponentStyle.bottom, bottom),
            lineNode: lines.xb[0], // xb
            line: 'xb',
            dragShift: bottom - curComponentStyle.height,
            lineShift: bottom,
          },
        ],
        left: [
          {
            isNearly: isNearly(curComponentStyle.left, left),
            lineNode: lines.yl[0], // yl
            line: 'yl',
            dragShift: left,
            lineShift: left,
          },
          {
            isNearly: isNearly(curComponentStyle.right, left),
            lineNode: lines.yl[0], // yl
            line: 'yl',
            dragShift: left - curComponentStyle.width,
            lineShift: left,
          },
          {
            // 组件与拖拽节点的中间是否对齐
            isNearly: isNearly(curComponentStyle.left + curComponentHalfwidth, left + componentHalfwidth),
            lineNode: lines.yc[0], // yc
            line: 'yc',
            dragShift: left + componentHalfwidth - curComponentHalfwidth,
            lineShift: left + componentHalfwidth,
          },
          {
            isNearly: isNearly(curComponentStyle.left, right),
            lineNode: lines.yr[0], // yr
            line: 'yr',
            dragShift: right,
            lineShift: right,
          },
          {
            isNearly: isNearly(curComponentStyle.right, right),
            lineNode: lines.yr[0], // yr
            line: 'yr',
            dragShift: right - curComponentStyle.width,
            lineShift: right,
          },
        ],
      }

      const needToShow: any[] = []
      const { rotate } = curComponent.style
      Object.keys(conditions).forEach((key) => {
        // 遍历符合的条件并处理
        conditions[key as 'top' | 'left'].forEach((condition) => {
          if (!condition.isNearly) return
          // 修改当前组件位移
          setShapeSingleStyleDispatch({
            key,

            value: rotate !== 0 ? translateCurComponentShift(key, condition, curComponentStyle) : condition.dragShift,
          })
          condition.lineNode.style[key] = `${condition.lineShift}px`
          needToShow.push(condition.line)
        })
      })

      // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
      // 同一方向上的线只显示一条，例如多条横条只显示一条横线
      if (needToShow.length > 0) {
        chooseTheTureLine(needToShow, isDownward, isRightward)
      }
    })
  }
  // 监听元素移动和不移动的事件
  useEffect(() => {
    const showLineFn = (isDownward: any, isRightward: any) => {
      showLine(isDownward, isRightward)
    }
    eventBus.addListener('move', showLineFn)
    return () => {
      eventBus.removeListener('move', showLineFn)
    }
  }, [])

  useEffect(() => {
    eventBus.addListener('unmove', hideLine)
    return () => {
      eventBus.removeListener('unmove', hideLine)
    }
  }, [])

  return (
    <div className='mark-line'>
      {lines.map((line, i) => {
        const isShow: boolean = lineStatus[line] || false
        return (
          <React.Fragment key={line}>
            {isShow && (
              <div
                key={line}
                className={`line ${line.includes('x') ? 'xline' : 'yline'}`}
                ref={(ref) => lineRefs.current.push(ref)}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default connect(
  (state: IRootDefaultState) => ({
    editorData: state.get('editor'),
  }),
  () => ({ setShapeSingleStyleDispatch }),
)(memo(MarkLine))
