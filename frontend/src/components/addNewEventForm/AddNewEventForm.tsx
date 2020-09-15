/* eslint-disable no-useless-escape */
import React, { FunctionComponent, ReactElement, useState } from 'react';
import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { LoadingBar } from '../loadingBar/LoadingBar';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useHistory } from 'react-router';
import { Button, DatePicker } from 'antd';
import { EventProps } from '../eventById/EventById';
import './AddNewEventForm.scss';

const validateForm = (errors: EventProps, inputs: EventProps): boolean => {
  let valid = true;
  if (Object.values(errors).some((val) => val !== '')) valid = false;
  if (Object.values(inputs).some((val) => val === '')) valid = false;
  return valid;
};

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const initialValue = { name: '', email: '', date: '' };

export const AddNewEventForm: FunctionComponent = (): ReactElement => {
  const [inputs, setInputs] = useState<EventProps>(initialValue);
  const [errors, setErrors] = useState<EventProps>(initialValue);
  const history = useHistory();

  const { data, status, executeRequest } = useHttpClient(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/addNewEvent`, {
    method: 'POST',
    body: { name: inputs.name, email: inputs.email, date: inputs.date },
    options: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        errors.name = value.length < 3 ? 'Event name must be 3 characters long!' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      default:
        break;
    }
    setInputs({ ...inputs, [name]: value });
    setErrors(errors);
  };

  const handleSubmit = () => validateForm(errors, inputs) && executeRequest();

  if (data && data.eventId) {
    history.push({ pathname: `/event/${data.eventId}` });
  }

  if (status === 'pending') {
    return <LoadingBar />;
  }

  return (
    <form onSubmit={handleSubmit} className="form" data-testid="form">
      <h2>Add New Event</h2>
      {status === 'rejected' && <ErrorAlert errorMessage="Failed to add new event" />}

      <div className="form--item">
        <label htmlFor="name">Event Name</label>
        <input id="name" type="text" name="name" value={inputs.name} onChange={handleChange} className="form--input" />
        <ErrorAlert errorMessage={errors.name} />
      </div>
      <div className="form--item">
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" value={inputs.email} onChange={handleChange} className="form--input" />
        <ErrorAlert errorMessage={errors.email} />
      </div>
      <div className="form--item">
        <label htmlFor="date">Event Date</label>
        <DatePicker id="date" data-testid="date" name="event date" onChange={(_date: any, dateString: string): any => (dateString === '' ? setErrors({ ...errors, date: 'Date is required!' }) : (setInputs({ ...inputs, date: dateString }), setErrors({ ...errors, date: '' })))} style={{ width: '200px' }} size="large" />
        <ErrorAlert errorMessage={errors.date} />
      </div>
      <Button type="primary" data-testid="submit-btn" htmlType="submit" className="btn-form" disabled={!validateForm(errors, inputs)}>
        Add event
      </Button>
    </form>
  );
};
