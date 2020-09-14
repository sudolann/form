import React from 'react';
import { EventById } from './EventById';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router';
import { useHttpClient } from '../../hooks/useHttpClient';
import { renderHook, act } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';

jest.mock('react-router', () => ({
  useLocation: jest.fn(),
  useParams: jest.fn(),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// function setup() {
//   const returnVal: any = {};
//   function TestComponent() {
//     Object.assign(returnVal, useHttpClient());
//     return null;
//   }
//   render(<TestComponent />);
//   return returnVal;
// }



describe('EventById', () => {
  beforeEach(() => {
    jest
      .spyOn(router, 'useParams')
      .mockReturnValue({ eventId: '5efb130b3d664b27045bf085' });
  });
  // it('should take a snapshot', () => {
  //   const { asFragment } = render(<EventById />);
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // it('test', async () => {
  //   jest.spyOn(window, 'fetch')
  //   const { asFragment } = render(<EventById />);

  //   const { result } = renderHook(() => useHttpClient());
  //   act(() => {
  //     result.current.sendRequest(
  //       'http://localhost:5000/event/5f5768a7e82b252a44f5c6c9',
  //     );
  //   });
  //   console.log(result.current);

  //   // await waitFor(() => screen.debug())

  //   // expect(hook.isLoading).toBe(false);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
