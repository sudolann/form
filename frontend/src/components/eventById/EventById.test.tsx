import React from 'react';
import { EventById } from './EventById';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { server } from '../../testUtils/server-handlers';
import { useHttpClient } from '../../hooks/useHttpClient';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  useParams: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

describe('EventById', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useParams').mockReturnValue({ eventId: '5f60bd0473ad66b05472379a' });
  });

  it('return data object', async () => {
    render(<EventById />);
    const { result } = renderHook(() => useHttpClient('https://form-d.herokuapp.com/event/5f60bd0473ad66b05472379a'));
    await act(() => result.current.executeRequest());

    expect(result.current.status).toBe('resolved');
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });
});
