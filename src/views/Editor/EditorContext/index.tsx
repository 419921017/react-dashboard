import React, { FC, createContext, useReducer } from 'react'
import { Action } from 'redux'
import reducer, { defaultState, IEditStore } from '../store'

// TODO: 这里没有使用react-redux, 使用的hooks模拟的redux功能, 主要是为了模块化, 单一处理单个editor页面的数据流动
interface IEditorContext {
  editorData: IEditStore
  editorDispatch: React.Dispatch<Action>
}

export const EditorContext = createContext<IEditorContext>({ editorData: defaultState, editorDispatch: () => {} })

export const EditorProvider: FC = (props) => {
  const [editorData, editorDispatch] = useReducer(reducer, defaultState)
  return (
    <EditorContext.Provider
      value={{
        editorData,
        editorDispatch,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  )
}
