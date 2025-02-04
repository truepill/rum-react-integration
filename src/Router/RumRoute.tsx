import React, { useMemo } from 'react'
import type { RouteProps } from 'react-router-dom'
import { Route } from 'react-router-dom'

import { withRum } from './RumRouteComponentWrapper'

type RumRouteProps = RouteProps

export const RumRoute: React.FC<RumRouteProps> = ({ children, component, render, ...otherProps }) => {
  const RumComponent = useMemo(() => {
    // this is react-router priority
    return withRum(children ?? component ?? render)
  }, [children, component, render])

  return <Route {...otherProps} component={RumComponent} />
}
