import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { MockInstance } from 'vitest'

import { getGlobalObject } from '../utils/getGlobalObject'
import { RumComponentContextProvider } from './RumComponentContext'
import { useRumAction } from './use-rum-action'

vi.mock('../utils/getGlobalObject', () => ({
  getGlobalObject: vi.fn(),
}))

describe('useRumAction', () => {
  let rumAgent: {
    addAction: () => void
  }
  let addActionSpy: MockInstance

  beforeEach(() => {
    addActionSpy = vi.fn()
    rumAgent = {
      addAction: addActionSpy,
    } as any
    ;(getGlobalObject as unknown as MockInstance).mockReturnValue({
      DD_RUM: rumAgent,
    })
  })

  it('should send an action with user-tracking purpose', () => {
    const {
      result: { current: addRumAction },
    } = renderHook(() => useRumAction('action-fou-tracking'))
    act(() => {
      addRumAction('test-element', {
        customAttr1: 'fou',
        customAttr2: 'fou',
      })
    })

    expect(rumAgent.addAction).toHaveBeenCalledTimes(1)
    expect(rumAgent.addAction).toHaveBeenCalledWith('test-element', {
      customAttr1: 'fou',
      customAttr2: 'fou',
      purpose: 'action-fou-tracking',
      react: {
        breadcrumbs: 'root',
        component: 'root',
      },
    })
  })

  it('should use the context to fill element and breadcrumbs', () => {
    const wrapper: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
      <RumComponentContextProvider componentName='ComponentToTrack'>{children}</RumComponentContextProvider>
    )

    const {
      result: { current: addRumAction },
    } = renderHook(() => useRumAction('action-fou-tracking'), { wrapper })
    act(() => {
      addRumAction('test-element', {
        customAttr1: 'fou',
        customAttr2: 'fou',
      })
    })

    expect(rumAgent.addAction).toHaveBeenCalledWith('test-element', {
      customAttr1: 'fou',
      customAttr2: 'fou',
      purpose: 'action-fou-tracking',
      react: {
        breadcrumbs: 'root.ComponentToTrack',
        component: 'ComponentToTrack',
      },
    })
  })
})
