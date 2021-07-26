import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Routes } from '../enums/router'
import { Dashboard, Home, Login, Map, Product } from '../pages'

const routes = [
  { to: Routes.HOME, component: <Home /> },
  { to: Routes.LOGIN, component: <Login /> },
  { to: Routes.DASHBOARD, component: <Dashboard /> },
  { to: Routes.MAP, component: <Map /> },
  { to: Routes.EXTINGUISHER, component: <Product />, isExact: false },
  { to: Routes.DETECTOR, component: <Product />, isExact: false },
]

const Router: FC = () => {
  return (
    <Switch>
      {routes.map(({ component, to, isExact }, index) => (
        <Route key={`Route_${index}`} path={to} exact={isExact || true}>
          {component}
        </Route>
      ))}
    </Switch>
  )
}

export default Router
