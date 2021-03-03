import React, { FC, memo, useEffect } from 'react'
import Component from 'Src/customComponents/Component'

import { getStyle } from '../../views/Editor/utils/style'
import { IEditComponent } from '../../views/Editor/types'

import './index.less'

const toPercent: (val: number) => string = (val) => {
  return `${val * 100}%`
}

type PageStateProps = {
  // [propsName: string]: any
  propValue: IEditComponent[]
  element: IEditComponent
}

type PageDispatchProps = {
  // [propsName: string]: any
}

type PageOwnProps = {
  // [propsName: string]: any
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const Group: FC<IProps> = (props) => {
  const { propValue, element } = props

  useEffect(() => {
    const parentStyle = element.style

    propValue.forEach((component) => {
      // component.groupStyle 的 top left 是相对于 group 组件的位置
      // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
      if (!component.groupStyle || Object.keys(component.groupStyle).length === 0) {
        const style = { ...component.style }
        component.groupStyle = getStyle(style)
        component.groupStyle.left = toPercent((style.left - parentStyle.left) / parentStyle.width)
        component.groupStyle.top = toPercent((style.top - parentStyle.top) / parentStyle.height)
        component.groupStyle.width = toPercent(style.width / parentStyle.width)
        component.groupStyle.height = toPercent(style.height / parentStyle.height)
      }
    })
  }, [])

  return (
    <div className='group'>
      <div>
        {propValue.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <Component
                key={item.id}
                id={`component${item.id}`}
                className='component'
                element={item}
                style={item.groupStyle}
                propValue={item.propValue}
              />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default memo(Group)
