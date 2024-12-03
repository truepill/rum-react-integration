import { useContext } from 'react'

import { getGlobalObject } from '../utils/getGlobalObject'
import { RumComponentContext } from './rum-component-context'

type UseRumErrorReturnValue = (error: unknown, customAttributes: Record<string, unknown> | undefined) => void

/**
 * Utility to track errors in RUM with the component chain/breadcrumbs from <RumComponentContextProvider> automatically added
 *
 */
export const useRumError = (): UseRumErrorReturnValue => {
  const componentContext = useContext(RumComponentContext)
  const RumGlobal = getGlobalObject<Window>().DD_RUM

  if (!RumGlobal) {
    console.warn('@datadog/rum-react-integration: Datadog RUM SDK is not initialized.')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }

  return (error: unknown, customAttributes: Record<string, unknown> | undefined) => {
    RumGlobal.addError(error, {
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
