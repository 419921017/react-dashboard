import React, { FC, ComponentType } from 'react'
import { renderRoutes } from 'react-router-config'
import { IRoute } from '../types'

const HomeLayout: FC<IRoute> = ({ route }) => {
  return <>{renderRoutes(route.routes)}</>
}

export default HomeLayout as ComponentType
