import React from 'react';
import { App } from './App';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';

describe('App', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <Router>
        <App />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
