import type { RumPublicApi } from '@datadog/browser-rum-core'

export { ErrorBoundary } from './ErrorBoundary'
export { RumRouterExtension } from './Router'
export { RumComponentContextProvider, useRumAction, useRumError, WithRumComponentContext } from './RumComponentContext'

declare global {
  interface Window {
    DD_RUM?: RumPublicApi & {
      startView?(name?: string): void
    }
  }
}
