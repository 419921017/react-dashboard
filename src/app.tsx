import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import routes from './routes'
import store from './store'
import './app.less'

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <HashRouter>{renderRoutes(routes)}</HashRouter>
      </ConfigProvider>
    </Provider>
  )
}

export default App
