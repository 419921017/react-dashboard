import React, { memo, FC } from 'react'

const Editor: FC = (props) => {
  return (
    <>
      123
      {props.children}
    </>
  )
}

export default memo(Editor)
