import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Routes } from '../enums/router.enum'
import DashboardPage from '../pages/Dashboard'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'
import MapPage from '../pages/Map'

const routes = [
  { to: Routes.HOME, component: <HomePage /> },
  { to: Routes.LOGIN, component: <LoginPage /> },
  { to: Routes.DASHBOARD, component: <DashboardPage /> },
  { to: Routes.MAP, component: <MapPage /> },
]

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <Route key={`Route_${index}`} path={route.to} exact>
            {route.component}
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default Router
