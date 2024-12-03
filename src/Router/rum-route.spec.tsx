/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { act, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React, { Component } from 'react'
import type { RouteProps } from 'react-router-dom'
import { Redirect, Route, Router } from 'react-router-dom'

import { getGlobalObject } from '../utils/getGlobalObject'
import { RumRoute } from './RumRoute'

const history = createMemoryHistory()

const defaultProps: RouteProps = {}

const globalObj = getGlobalObject<Window>()

describe('<RumRoute />', () => {
  const buildSubject = (props = defaultProps) => {
    return render(
      <Router history={history}>
        <Redirect from='/' to='/home' />
        <RumRoute path='/home'>Home is where the heart is</RumRoute>
        <RumRoute path='/thread/:threadId'>
          Here&apos;s some relevant info regarding planks and rope skipping
          <RumRoute path='/thread/:threadId/comment/:commentId'>Nice</RumRoute>
        </RumRoute>
        <Route path='/about'>
          <RumRoute path='/about/history'>Last edited: yesterday</RumRoute>
        </Route>
        <RumRoute path='/rumRoute' {...props} />
        <div>Footer</div>
      </Router>,
    )
  }

  beforeEach(() => {
    globalObj.DD_RUM = {
      getInitConfiguration: () => ({ trackViewsManually: true }),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      startView: () => {},
    } as any
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('startView calls', () => {
    it('should be able call RUM startView through router redirect', () => {
      jest.spyOn(globalObj.DD_RUM!, 'startView')
      const { getByText } = buildSubject()

      getByText(/Home is where the heart is/i)

      expect(globalObj.DD_RUM?.startView).toHaveBeenCalledTimes(1)
      expect(globalObj.DD_RUM?.startView).toHaveBeenLastCalledWith('/home')
    })

    it('should call RUM startView through nested routes', () => {
      const { getByText } = buildSubject()

      jest.spyOn(globalObj.DD_RUM!, 'startView')
      act(() => history.push('/thread/10/comment/20'))

      getByText(/Nice/i)

      expect(globalObj.DD_RUM?.startView).toHaveBeenNthCalledWith(1, '/thread/:threadId')
      expect(globalObj.DD_RUM?.startView).toHaveBeenNthCalledWith(2, '/thread/:threadId/comment/:commentId')
    })

    it('should call RUM startView when combining Route and RumRoute', () => {
      const { getByText } = buildSubject()

      jest.spyOn(globalObj.DD_RUM!, 'startView')
      act(() => history.push('/about/history'))

      getByText(/Last edited: yesterday/i)

      expect(globalObj.DD_RUM?.startView).toHaveBeenNthCalledWith(1, '/about/history')
      expect(globalObj.DD_RUM?.startView).not.toHaveBeenCalledWith('/about')
    })
  })

  describe('ReactRouter children rendering', () => {
    it('should render strings', () => {
      const { getByText } = buildSubject({ children: 'This is a string' })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a string/i)
      expect(node).toBeInTheDocument()
    })

    it('should render JSX', () => {
      const { getByText } = buildSubject({
        children: <div>This is a JSX children</div>,
      })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a JSX children/i)
      expect(node).toBeInTheDocument()
    })

    it('should render a React element', () => {
      const TestChildren = () => <div>This is a React element</div>
      const { getByText } = buildSubject({ children: <TestChildren /> })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a React element/i)
      expect(node).toBeInTheDocument()
    })
  })

  describe('ReactRouter render prop rendering', () => {
    it('should render strings', () => {
      const { getByText } = buildSubject({ render: () => 'This is a string' })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a string/i)
      expect(node).toBeInTheDocument()
    })

    it('should render JSX', () => {
      const { getByText } = buildSubject({
        render: () => <div>This is a JSX children</div>,
      })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a JSX children/i)
      expect(node).toBeInTheDocument()
    })

    it('should render a React element', () => {
      const TestChildren = () => <div>This is a React element</div>
      const { getByText } = buildSubject({ render: () => <TestChildren /> })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a React element/i)
      expect(node).toBeInTheDocument()
    })
  })

  describe('ReactRouter component prop rendering', () => {
    it('should render a React Functional Component', () => {
      const TestChildren = () => <div>This is a React Functional Component</div>
      const { getByText } = buildSubject({ render: () => <TestChildren /> })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a React Functional Component/i)
      expect(node).toBeInTheDocument()
    })

    it('should render a React Class Component', () => {
      const TestChildren = class Test extends Component {
        render() {
          return <div>This is a React Class Component</div>
        }
      }
      const { getByText } = buildSubject({ render: () => <TestChildren /> })
      act(() => history.push('/rumRoute'))

      const node = getByText(/This is a React Class Component/i)
      expect(node).toBeInTheDocument()
    })
  })
})
