import React, { FC, ComponentType } from 'react'
import { renderRoutes } from 'react-router-config'
import { IRoute } from '../types'

const BlankLayout: FC<IRoute> = ({ route }) => {
  return <>{renderRoutes(route.routes)}</>
}
export default BlankLayout as ComponentType
