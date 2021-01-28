import React, { memo, FC } from 'react'

const Index: FC = (props) => {
  return (
    <div className='index'>
      index
      {props.children}
    </div>
  )
}

export default memo(Index)
