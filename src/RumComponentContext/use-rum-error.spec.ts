import { act, renderHook } from '@testing-library/react'

import { getGlobalObject } from '../utils/getGlobalObject'
import { useRumError } from './use-rum-error'

jest.mock('../utils/getGlobalObject', () => ({
  getGlobalObject: jest.fn(),
}))

describe('useRumError', () => {
  let rumAgent: {
    addError: () => void
  }
  let addErrorSpy: jest.Mock

  beforeEach(() => {
    addErrorSpy = jest.fn()
    rumAgent = {
      addError: addErrorSpy,
    } as any

    ;(getGlobalObject as jest.Mock).mockReturnValue({
      DD_RUM: rumAgent,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
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
    expect((rumAgent.addError as jest.MockedFunction<typeof rumAgent.addError>).mock.calls[0]).toMatchInlineSnapshot(`
            Array [
              Object {
                "errorFou": "fou",
                "message": "bar",
              },
              Object {
                "customAttr1": "fou",
                "customAttr2": "fou",
                "react": Object {
                  "breadcrumbs": "root",
                  "component": "root",
                },
              },
            ]
        `)
  })
})
