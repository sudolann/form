import React from 'react'
import {AddNewEventForm} from './AddNewEventForm'
import {render, fireEvent, screen} from '@testing-library/react'
import {renderHook, act, cleanup} from '@testing-library/react-hooks'

import {server} from '../../testUtils/server-handlers'
import {useHttpClient} from '../../hooks/useHttpClient'
import '@testing-library/jest-dom/extend-expect'

beforeAll(() => {
  spyOn(console, 'error');
  spyOn(console, 'warn');
  jest.spyOn(window, 'fetch')
  server.listen()
})
afterAll(() => {
  server.close()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

const setup = (labelText: string) => {
  const utils = render(<AddNewEventForm />)
  const input = utils.getByLabelText(labelText)
  return {
    input,
    ...utils,
  }
}

test('shows server error if the request fails', async () => {
  const {getByLabelText, asFragment} = render(<AddNewEventForm />)

  const {result} = renderHook(() =>
    useHttpClient('https://form-d.herokuapp.com/addNewEvent', {
      method: 'POST',
      body: {name: 'test', email: 'me@gmail.com', date: '20/02/2020'},
      options: {
        headers: {
          'Content-type': 'application/json',
        },
      },
    }),
  )

  fireEvent.change(getByLabelText(/Event Name/i), {target: {value: 'test'}})
  fireEvent.change(getByLabelText(/Email Address/i), {
    target: {value: 'me@wp.pl'},
  })
  const startDate = screen.getByTestId('date')

  fireEvent.mouseDown(startDate)
  fireEvent.change(startDate, {target: {value: '10-12-2020'}})

  fireEvent.submit(screen.getByTestId('submit-btn'))
  act(() => result.current.executeRequest())

  expect(asFragment()).toMatchSnapshot()
})

describe('AddNewEventForm', () => {
  it('should take a snapshot', () => {
    const {asFragment} = render(<AddNewEventForm />)
    expect(asFragment()).toMatchSnapshot()
  })
  it('displays title', () => {
    const {getByText} = render(<AddNewEventForm />)
    const title = getByText(/Add New Event/i)
    expect(title).toBeInTheDocument()
  })
  it('renders disabled button by default', () => {
    const {getByRole} = render(<AddNewEventForm />)
    expect(getByRole('button')).toBeDisabled()
  })
})

describe('Inputs validation', (): void => {
  it.each`
    inputName          | attr
    ${'Event Name'}    | ${['type', 'text']}
    ${'Email Address'} | ${['type', 'email']}
    ${'Event Date'}    | ${['name', 'event date']}
  `(
    '$inputName has an defined attributes and their value is empty by default',
    ({inputName, attr}): void => {
      const {getByLabelText} = render(<AddNewEventForm />)
      expect(getByLabelText(inputName)).toHaveAttribute(attr[0], attr[1])
      expect(getByLabelText(inputName)).toHaveAttribute('value', '')
    },
  )
  describe('renders validation message when', () => {
    it.each`
      value
      ${'a'}
      ${'ab'}
      ${'1'}
      ${'1a'}
      ${'11'}
    `('added invalid input: $value added on name input', async ({value}) => {
      const {getAllByTestId} = render(<AddNewEventForm />)
      const {input} = setup('Event Name')
      fireEvent.change(input, {target: {value}})
      const alert = getAllByTestId('error')[0]

      expect(alert).toHaveTextContent(/Event name must be 3 characters long!/i)
    })
    it.each`
      value
      ${'a'}
      ${'ab'}
      ${'ab@'}
      ${'@gmail.com'}
      ${'.com'}
    `('added invalid input: $value added on email input', async ({value}) => {
      const {getAllByTestId} = render(<AddNewEventForm />)
      const {input} = setup('Email Address')
      fireEvent.change(input, {target: {value}})
      const alert = getAllByTestId('error')[1]

      expect(alert).toHaveTextContent(/Email is not valid!/i)
    })
    describe('does not renders validation message when', () => {
      it.each`
        value
        ${'test'}
        ${'co1'}
      `('added valid input: $value added on name input', async ({value}) => {
        const {getAllByTestId} = render(<AddNewEventForm />)
        const {input} = setup('Event Name')
        fireEvent.change(input, {target: {value}})
        const alert = getAllByTestId('error')[0]

        expect(alert).not.toHaveTextContent(
          /Event name must be 3 characters long!/i,
        )
      })
      it.each`
        value
        ${'ann@wp.pl'}
        ${'me@gmail.com'}
      `('added valid input: $value added on email input', async ({value}) => {
        const {getAllByTestId} = render(<AddNewEventForm />)
        const {input} = setup('Email Address')
        fireEvent.change(input, {target: {value}})
        const alert = getAllByTestId('error')[1]

        expect(alert).not.toHaveTextContent(/Email is not valid!/i)
      })
    })
  })
})
