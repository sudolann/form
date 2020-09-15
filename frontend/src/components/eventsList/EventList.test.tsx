import React from 'react';
import { EventsList } from './EventsList';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { server } from '../../testUtils/server-handlers';
import { useHttpClient } from '../../hooks/useHttpClient';
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
  it('return data', async () => {
    render(<EventsList />);
    const { result } = renderHook(() => useHttpClient('https://form-d.herokuapp.com/events'));
    await act(() => result.current.executeRequest());

    expect(result.current.status).toBe('resolved');
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });
});
