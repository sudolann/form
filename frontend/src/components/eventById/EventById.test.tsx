import React from 'react';
import { EventById } from './EventById';
import '@testing-library/jest-dom/extend-expect';
import * as router from 'react-router';

import { render } from '@testing-library/react';
jest.mock('react-router', () => ({
    useLocation: jest.fn(),
    useParams: jest.fn(),
    useHistory: () => ({
      push: jest.fn(),
    }),
}));


describe('EventById', () => {
  it('should take a snapshot', async () => {
    jest.spyOn(router, 'useParams').mockReturnValue({ eventId: "5efb130b3d664b27045bf085" });

    const { asFragment } = render(<EventById />);
    expect(asFragment()).toMatchSnapshot();
  });
});