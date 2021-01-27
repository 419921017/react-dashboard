import React, { FC, lazy, Suspense, ComponentType } from 'react'
import { Redirect } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'

import BlankLayout from '../layouts/BlankLayout'
import HomeLayout from '../layouts/HomeLayout'
import EditorLayout from '../layouts/EditorLayout'

const IndexComponent = lazy(() => import('../views/Index'))
const EditorComponent = lazy(() => import('../views/Editer'))

interface SuspenseComponent {
  (SComponent: ComponentType): FC
}

const SuspenseComponent: SuspenseComponent = (SComponent) => {
  const WrapperComponent: FC = (props) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SComponent {...props} />
      </Suspense>
    )
  }
  return WrapperComponent
}

const router: RouteConfig[] = [
  {
    component: BlankLayout,
    routes: [
      {
        path: '/',
        component: HomeLayout,
        routes: [
          {
            path: '/',
            exact: true,
            render: () => <Redirect to='/index' />,
          },
          {
            path: '/index',
            key: 'index',
            // component: SuspenseComponent(IndexComponent),
            component: SuspenseComponent(IndexComponent),
            // component: Index,
            // routes: [
            //   {
            //     path: '/index/:id',
            //     component: SuspenseComponent(IndexComponent),
            //   },
            // ],
          },
          {
            path: '/editor',
            component: EditorLayout,
            routes: [
              {
                path: '/editor/:id',
                key: 'index',
                component: SuspenseComponent(EditorComponent),
                // routes: [
                //   {
                //     path: '/recommend/:id',
                //     component: SuspenseComponent(AlbumComponent),
                //   },
                // ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export default router
