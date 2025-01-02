import { act, render } from '@testing-library/react'
import { BrowserRouter, Navigate, NavigateFunction, Route, Routes, useNavigate } from 'react-router'

import { getGlobalObject } from '../utils/getGlobalObject'
import RumRouterExtension from './RumRouterExtension'

const globalObj = getGlobalObject<Window & { DD_RUM: any }>()

describe('<RumRoute />', () => {
  const buildSubject = () => {
    let navigate: NavigateFunction | undefined

    const ChildComponent: React.FC<{ text: string }> = ({ text }) => {
      navigate = useNavigate()
      return <p>{text}</p>
    }

    const result = render(
      <BrowserRouter>
        <RumRouterExtension />
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<ChildComponent text='Home is where the heart is' />} />
          <Route path='/thread/:threadId'>
            <Route path='/thread/:threadId/comment/:commentId' element={<ChildComponent text='Nice' />} />
          </Route>
        </Routes>
        <div>Footer</div>
      </BrowserRouter>,
    )

    return { ...result, navigate }
  }

  beforeEach(() => {
    globalObj.DD_RUM = {
      getInitConfiguration: () => ({ trackViewsManually: true }),
      startView: vi.fn(),
    } as any
  })

  describe('startView calls', () => {
    it('should be able to call RUM startView through router redirect', () => {
      vi.spyOn(globalObj.DD_RUM, 'startView')
      const { getByText } = buildSubject()

      expect(getByText(/Home is where the heart is/i)).toBeInTheDocument()
      expect(globalObj.DD_RUM?.startView).toHaveBeenLastCalledWith('/home')
    })

    it('should call RUM startView through nested routes', () => {
      const { getByText, navigate } = buildSubject()

      vi.spyOn(globalObj.DD_RUM, 'startView')
      act(() => navigate?.('/thread/10/comment/20'))

      expect(getByText(/Nice/i)).toBeInTheDocument()
      expect(globalObj.DD_RUM?.startView).toHaveBeenCalledWith('/thread/10/comment/20')
    })
  })
})
