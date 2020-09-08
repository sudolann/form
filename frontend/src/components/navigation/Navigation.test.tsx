import React from 'react';
import { Navigation } from './Navigation';
import '@testing-library/jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
describe('Navigation', () => {
  it('should take a snapshot', async () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Router history={history}>
        <Navigation />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders navigation links', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Navigation />
      </Router>,
    );
    expect(getByText('Events list').closest('a')).toHaveAttribute(
      'href',
      '/',
    );

    expect(getByText('Add new event').closest('a')).toHaveAttribute(
      'href',
      '/form',
    );
  });
});
