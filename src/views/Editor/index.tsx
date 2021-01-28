import React from 'react'
import Editor from './Editor'
import { EditorProvider } from './EditorContext'

export default () => (
  <EditorProvider>
    <Editor />
  </EditorProvider>
)
