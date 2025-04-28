import { render } from '@testing-library/react'
import type { MockInstance } from 'vitest'

import { getGlobalObject } from '../utils/getGlobalObject'
import { ErrorBoundary } from './ErrorBoundary'

vi.mock('../utils/getGlobalObject', () => ({
  getGlobalObject: vi.fn(),
}))

const Throws = () => {
  throw new Error('Oh no!')
}

describe('ErrorBoundary', () => {
  let addError: (error: unknown, context?: object) => void

  beforeEach(() => {
    addError = vi.fn()
    ;(getGlobalObject as unknown as MockInstance).mockReturnValue({
      DD_RUM: {
        addError,
      },
    })
  })

  const ErrorRenderer = (error: Error) => <h1>Pretty error displayed {error.message}</h1>

  it('sends errors to addError', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={ErrorRenderer}>
        <Throws />
      </ErrorBoundary>,
    )

    expect(getByText(/Pretty error displayed/i)).toBeInTheDocument()
    expect(addError).toHaveBeenCalledTimes(1)
  })
})
