import { useHttpClient } from './useHttpClient';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { server } from '../testUtils/testServer';

beforeAll(() => {
  jest.spyOn(window, 'fetch');
  server.listen();
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

describe('useHttpClient', () => {
  describe('GET method', () => {
    it('should loading the app and should return data', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useHttpClient('https://jsonplaceholder.typicode.com/'));
      act(() => {
        result.current.executeRequest();
      });
      expect(result.current.status).toBe('pending');
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
      await waitForNextUpdate();
      expect(result.current.status).toBe('resolved');
      expect(result.current.data).toBeDefined();
      expect(result.current.error).toBeNull();
    });
    it('Should return an error, when wrong path provided', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useHttpClient('https://jsonplaceholder.typicode.com/post/'));
      act(() => {
        result.current.executeRequest();
      });
      expect(result.current.status).toBe('pending');

      await waitForNextUpdate();
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
      expect(result.current.status).toBe('rejected');
    });
  });
  describe('POST method', () => {
    it('should loading and return data object', async () => {
      const { result } = renderHook(() =>
        useHttpClient('https://jsonplaceholder.typicode.com/posts/', {
          method: 'POST',
          body: {
            title: 'foo',
            body: 'bar',
            userId: 1,
          },
          options: {
            headers: {
              'Content-type': 'application/json',
            },
          },
        }),
      );
      await act(() => result.current.executeRequest());

      expect(result.current.status).toBe('resolved');
      expect(result.current.data).toBeDefined();
      expect(result.current.error).toBeNull();
    });
  });
});
