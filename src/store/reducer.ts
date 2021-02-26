import { combineReducers } from 'redux-immutable'

import { reducer as EditorReducer } from 'Src/views/Editor/store'

// import compose from 'Src/views/Editor/store/compose'
// import componentArea from 'Src/views/Editor/store/componentArea'
// import contextmenu from 'Src/views/Editor/store/contextmenu'
// import copy from 'Src/views/Editor/store/copy'
// import edit from 'Src/views/Editor/store/edit'
// import snapshot from 'Src/views/Editor/store/snapshot'
import { reducer as userReducer } from '../views/User/store'

export default combineReducers({
  // 之后开发具体功能模块的时候添加reducer
  user: userReducer,
  editor: EditorReducer,
  // compose,
  // componentArea,
  // contextmenu,
  // copy,
  // edit,
  // snapshot,
})
