import React from 'react';
import { EventListItem } from './EventListItem';
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';

describe('EventListItem', () => {
  it('should take a snapshot', async () => {
    const { asFragment } = render(
      <EventListItem
        name="test"
        email="me@email.com"
        date="20.01.2021"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders props', () => {
    const { getByText } = render(
      <EventListItem
        name="test"
        email="me@email.com"
        date="20.01.2021"
      />,
    );
    const eventName = getByText(/name: test/i);
    expect(eventName).toBeInTheDocument();
    const email = getByText(/email: me@email.com/i);
    expect(email).toBeInTheDocument();
    const date = getByText(/date: 20.01.2021/i);
    expect(date).toBeInTheDocument();
  });
});
