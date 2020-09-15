import {renderHook, act, cleanup} from '@testing-library/react-hooks'
import {useHttpClient} from './useHttpClient'
beforeAll(() => {
  spyOn(console, 'error')
  spyOn(console, 'warn')
})
afterEach(cleanup)
describe('useHttpClient - GET', () => {
  it('should loading the app and should return data', async () => {
    const {result} = renderHook(() =>
      useHttpClient('https://jsonplaceholder.typicode.com/posts/'),
    )
    await act(() => result.current.executeRequest())

    expect(result.current.status).toBe('resolved')
    expect(result.current.data).toBeDefined()
    expect(result.current.error).toBeNull()
  })

  it('Should return an error', async () => {
    const {result} = renderHook(() =>
      useHttpClient('https://jsonplaceholder.typicode.com/post/'),
    )
    await act(() => result.current.executeRequest())

    expect(result.current.status).toBe('rejected')
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeDefined()
  })
})

describe('useHttpClient - POST', () => {
  it('should loading and return data object', async () => {
    const {result} = renderHook(() =>
      useHttpClient('https://jsonplaceholder.typicode.com/posts/', {
        method: 'POST',
        body: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        options: {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      }),
    )
    await act(() => result.current.executeRequest())

    expect(result.current.status).toBe('resolved')
    expect(result.current.data).toBeDefined()
    expect(result.current.error).toBeNull()
  })

  it('should return an error', async () => {
    const {result} = renderHook(() =>
      useHttpClient('https://jsonplaceholder.typicode.com/po/', {
        method: 'POST',
        body: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        options: {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      }),
    )

    await act(() => result.current.executeRequest())

    expect(result.current.status).toBe('rejected')
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeDefined()
  })
})
