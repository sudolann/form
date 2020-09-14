import React from 'react';
import { AddNewEventForm } from './AddNewEventForm';
import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, cleanup } from '@testing-library/react';
afterEach(() => {
  cleanup();
});
const setup = (labelText: string) => {
  const utils = render(<AddNewEventForm />);
  const input = utils.getByLabelText(labelText);
  return {
    input,
    ...utils,
  };
};

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

describe('Inputs validation', (): void => {
  it.each`
    inputName          | attr
    ${'Event Name'}    | ${['type', 'text']}
    ${'Email Address'} | ${['type', 'email']}
    ${'Event Date'}    | ${['name', 'event date']}
  `(
    '$inputName has an defined attributes and their value is empty by default',
    ({ inputName, attr }): void => {
      const { getByLabelText } = render(<AddNewEventForm />);
      expect(getByLabelText(inputName)).toHaveAttribute(attr[0], attr[1]);
      expect(getByLabelText(inputName)).toHaveAttribute('value', '');
    },
  );
  describe('renders validation message when', () => {
    it.each`
      value
      ${'a'}
      ${'ab'}
      ${'1'}
      ${'1a'}
      ${'11'}
    `('added invalid input: $value added on name input', async ({ value }) => {
      const { getAllByTestId } = render(<AddNewEventForm />);
      const { input } = setup('Event Name');
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
      const alert = getAllByTestId('error')[0];

      expect(alert).toHaveTextContent(/Event name must be 3 characters long!/i);
    });
    it.each`
      value
      ${'a'}
      ${'ab'}
      ${'ab@'}
      ${'@gmail.com'}
      ${'.com'}
    `('added invalid input: $value added on email input', async ({ value }) => {
      const { getAllByTestId } = render(<AddNewEventForm />);
      const { input } = setup('Email Address');
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
      const alert = getAllByTestId('error')[1];

      expect(alert).toHaveTextContent(/Email is not valid!/i);
    });
    describe('does not renders validation message when', () => {
      it.each`
        value
        ${'test'}
        ${'co1'}
      `('added valid input: $value added on name input', async ({ value }) => {
        const { getAllByTestId } = render(<AddNewEventForm />);
        const { input } = setup('Event Name');
        fireEvent.change(input, { target: { value } });
        expect(input.value).toBe(value);
        const alert = getAllByTestId('error')[0];

        expect(alert).not.toHaveTextContent(/Event name must be 3 characters long!/i);
      });
      it.each`
        value
        ${'ann@wp.pl'}
        ${'me@gmail.com'}
      `('added valid input: $value added on email input', async ({ value }) => {
        const { getAllByTestId } = render(<AddNewEventForm />);
        const { input } = setup('Email Address');
        fireEvent.change(input, { target: { value } });
        expect(input.value).toBe(value);
        const alert = getAllByTestId('error')[1];

        expect(alert).not.toHaveTextContent(/Email is not valid!/i);
      });
    });
  });
});
