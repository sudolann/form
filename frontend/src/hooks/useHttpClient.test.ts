import { useHttpClient } from './useHttpClient';
import { renderHook, act } from '@testing-library/react-hooks'


beforeAll(() => jest.spyOn(window, 'fetch'));

describe('useHttpClient', () => {
  it('test', () => {
    const { result } = renderHook(() => useHttpClient())
    act(() => {
      result.current.sendRequest('test');
    })
    expect(window.fetch).toHaveBeenCalledWith('test', {body: null, headers: {}, method: "GET"});
  });
});
