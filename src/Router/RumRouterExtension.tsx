import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

import { getGlobalObject } from '../utils/getGlobalObject'

const RumRouterExtension: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    const globalObj = getGlobalObject<Window>()

    if (!globalObj.DD_RUM) {
      console.warn('@datadog/rum-react-integration: Datadog RUM SDK is not initialized.')
      return
    }

    if (!globalObj.DD_RUM?.startView) {
      console.warn('@datadog/rum-react-integration: Manual tracking not supported. Try updating the Datadog RUM SDK.')
      return
    }

    const manualTracking = !!globalObj.DD_RUM?.getInitConfiguration()?.trackViewsManually
    if (!manualTracking) {
      console.warn(
        '@datadog/rum-react-integration: The trackViewsManually flag in RUM initialization must be set to %ctrue%c.',
        'color:green',
        'color:default',
      )
      return
    }

    globalObj.DD_RUM.startView(location.pathname)
  }, [location.pathname])

  return null
}

export default RumRouterExtension
