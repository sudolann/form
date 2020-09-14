import React from 'react';
import { AddNewEventForm } from './AddNewEventForm';
import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, screen, getAllByTestId, MatcherFunction } from '@testing-library/react';

const setup = (labelText: string) => {
  const utils = render(<AddNewEventForm />);
  const input = utils.getByLabelText(labelText);
  return {
    input,
    ...utils,
  };
};

describe('Inputs validation', (): void => {
  it.each`
    inputName        | attr
    ${'Name'}        | ${['type', 'text']}
    ${'Email'}       | ${['type', 'email']}
    ${'Select date'} | ${['name', 'event date']}
  `(
    '$inputName has an attribute $attr[0] equal $attr[1] and their value is empty by default',
    ({ inputName, attr }): void => {
      const { getByPlaceholderText } = render(<AddNewEventForm />);
      expect(getByPlaceholderText(inputName)).toHaveAttribute(attr[0], attr[1]);
      expect(getByPlaceholderText(inputName)).toHaveAttribute('value', '');
    },
  );
  describe('renders validation message when added invalid input value on', () => {
    it('Name input', async () => {
      const { findByText } = render(<AddNewEventForm />);
      const { input } = setup('Event Name');
      fireEvent.change(input, { target: { value: 'ab' } });

      const alert = await findByText(/Event name must be 3 characters long!/i, { exact: false });

      expect(alert).toBeInTheDocument();
    });
    it('Email input', async () => {
      const { findByText } = render(<AddNewEventForm />);
      const { input } = setup('Email Address');
      fireEvent.change(input, { target: { value: 'te' } });

      const alert = await findByText(/Email is not valid!/i, { exact: false });

      expect(alert).toBeInTheDocument();
    });
  });
});

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
  it('renders disabled button by default', () => {
    const { getByRole } = render(<AddNewEventForm />);
    expect(getByRole('button')).toBeDisabled();
  });
});
