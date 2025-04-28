import { useContext } from 'react'

import { getGlobalObject } from '../utils/getGlobalObject'
import { RumComponentContext } from './rum-component-context'

type UseRumActionReturnValue = (name: string, customAttributes: Record<string, unknown> | undefined) => void

/**
 * Utility to track actions in RUM with the component chain/breadcrumbs from <RumComponentContextProvider> automatically added
 *
 * add a "purpose" to the custom attributes to group the actions
 *
 *
 * @param purpose: explains the use case for the action, allows to split performance and user-tracking actions for example
 */
export const useRumAction = (purpose = 'unknown'): UseRumActionReturnValue => {
  const componentContext = useContext(RumComponentContext)
  const RumGlobal = getGlobalObject<Window>().DD_RUM

  if (!RumGlobal) {
    console.warn('@datadog/rum-react-integration: Datadog RUM SDK is not initialized.')
    return () => {}
  }

  return (name: string, customAttributes?: Record<string, unknown>) => {
    RumGlobal.addAction(name, {
      purpose,
      ...componentContext.customAttributes,
      ...customAttributes,
      react: {
        breadcrumbs: componentContext.componentBreadCrumbs,
        component: componentContext.component,
        ...(customAttributes as any)?.react,
      },
    })
  }
}
