import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import store from './store'
import './app.scss'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </Provider>
  )
}

export default App
