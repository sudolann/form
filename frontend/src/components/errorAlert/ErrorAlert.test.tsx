import React from 'react';
import { ErrorAlert } from './ErrorAlert';
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';

describe('ErrorAlert', () => {
  it('renders alert message', () => {
    const { getByText } = render(<ErrorAlert errorMessage="test" />);
    const alertText = getByText(/test/i);
    expect(alertText).toBeInTheDocument();
  });

  it('should take a snapshot', () => {
    const { asFragment } = render(<ErrorAlert errorMessage="test" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should take a snapshot when fullPage is true', () => {
    const { asFragment } = render(
      <ErrorAlert errorMessage="test" fullPage />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
