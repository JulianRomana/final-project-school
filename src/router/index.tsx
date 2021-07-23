import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Routes } from '../enums/router'
import { Dashboard, Home, Login, Map, Product } from '../pages'

const routes = [
  { to: Routes.HOME, component: <Home /> },
  { to: Routes.LOGIN, component: <Login /> },
  { to: Routes.DASHBOARD, component: <Dashboard /> },
  { to: Routes.MAP, component: <Map /> },
  { to: Routes.EXTINGUISHER, component: <Product /> },
  { to: Routes.DETECTOR, component: <Product /> },
]

const Router: FC = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={`Route_${index}`} path={route.to} exact>
          {route.component}
        </Route>
      ))}
    </Switch>
  )
}

export default Router
