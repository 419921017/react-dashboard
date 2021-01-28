import React, { FC, createContext, useReducer } from 'react'
import reducer, { defaultState } from '../store/reducer'

// TODO: 这里没有使用react-redux, 使用的hooks模拟的redux功能, 主要是为了模块化, 单一处理单个editor页面的数据流动
export const EditorContext = createContext({})

export const EditorProvider: FC = (props) => {
  const [editorData, editorDispatch] = useReducer(reducer, defaultState)
  return <EditorContext.Provider value={{ editorData, editorDispatch }}>{props.children}</EditorContext.Provider>
}
