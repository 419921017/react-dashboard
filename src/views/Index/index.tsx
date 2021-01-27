import React, { memo, FC } from 'react'

const Index: FC = (props) => {
  return (
    <div className='index'>
      123
      {props.children}
    </div>
  )
}

export default memo(Index)
