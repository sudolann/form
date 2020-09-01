import React from 'react';
import { LoadingBar } from './LoadingBar';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('LoadingBar', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<LoadingBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
