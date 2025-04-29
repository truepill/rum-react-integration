import { act, renderHook } from '@testing-library/react'
import { MockInstance } from 'vitest'

import { getGlobalObject } from '../utils/getGlobalObject'
import { useRumError } from './use-rum-error'

vi.mock('../utils/getGlobalObject', () => ({
  getGlobalObject: vi.fn(),
}))

describe('useRumError', () => {
  let rumAgent: {
    addError: () => void
  }
  let addErrorSpy: MockInstance

  beforeEach(() => {
    addErrorSpy = vi.fn()
    rumAgent = {
      addError: addErrorSpy,
    } as any
    ;(getGlobalObject as unknown as MockInstance).mockReturnValue({
      DD_RUM: rumAgent,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should send an error with custom attributes and given source', () => {
    const fakeError = {
      errorFou: 'fou',
      message: 'bar',
    }
    const {
      result: { current: addRumError },
    } = renderHook(() => useRumError())
    act(() => {
      addRumError(fakeError, {
        customAttr1: 'fou',
        customAttr2: 'fou',
      })
    })

    expect(rumAgent.addError).toHaveBeenCalledTimes(1)
    expect(rumAgent.addError).toHaveBeenCalledWith(
      {
        errorFou: 'fou',
        message: 'bar',
      },
      {
        customAttr1: 'fou',
        customAttr2: 'fou',
        react: {
          breadcrumbs: 'root',
          component: 'root',
        },
      },
    )
  })
})
