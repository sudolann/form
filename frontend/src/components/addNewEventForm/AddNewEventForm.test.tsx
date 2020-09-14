import React from 'react';
import { AddNewEventForm } from './AddNewEventForm';
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';

describe('AddNewEventForm', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(<AddNewEventForm />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('displays title', () => {
    const { getByText } = render(<AddNewEventForm />);
    const title = getByText(/Add New Event/i);
    expect(title).toBeInTheDocument();
  });
  it('renders a number input with placeholders', () => {
    const { getByPlaceholderText } = render(<AddNewEventForm />);
    const inputName = getByPlaceholderText(/Name/i);
    expect(inputName).toHaveAttribute('type', 'text');
    const inputEmail = getByPlaceholderText(/Email/i);
    expect(inputEmail).toHaveAttribute('type', 'text');
    const inputDate = getByPlaceholderText(/Select Date/i);
    expect(inputDate).toBeInTheDocument();
  });
  it('display errors messages upon pressed button with empty inputs', () => {
    const { getByRole } = render(<AddNewEventForm />);
    // const inputName = getByPlaceholderText(/Name/i);
    // expect(inputName).toHaveAttribute('type', 'text');
    // const inputEmail = getByPlaceholderText(/Email/i);
    // expect(inputEmail).toHaveAttribute('type', 'text');
    // 
    
    const button = getByRole('button')
    // expect(inputDate).toBeInTheDocument();
  });
});
