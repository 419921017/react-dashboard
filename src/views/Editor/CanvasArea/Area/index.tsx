import React, { FC, memo } from 'react'

type PageStateProps = {
  // [propsName: string]: any
}

type PageDispatchProps = {
  // [propsName: string]: any
}

type PageOwnProps = {
  // [propsName: string]: any
  start: {
    x: number
    y: number
  }
  width: number
  height: number
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const Area: FC<IProps> = (props) => {
  const { start, width, height } = props
  return (
    <div
      className='area'
      style={{
        left: `${start.x}px`,
        top: `${start.y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  )
}

export default memo(Area)
