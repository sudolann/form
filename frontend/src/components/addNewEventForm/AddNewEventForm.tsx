import React, { FunctionComponent, ReactElement, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { LoadingBar } from '../loadingBar/LoadingBar';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useHistory } from 'react-router';
import { Button, DatePicker } from 'antd';
import './AddNewEventForm.scss';
import { EventProps } from '../eventById/EventById';

// type SubmittedData = { [s: string]: string };
const validateForm = (errors: EventProps, inputs: EventProps): boolean => {
  let valid = true;
  if (Object.values(errors).some((val) => val !== '')) valid = false;
  if (Object.values(inputs).some((val) => val === '')) valid = false;
  return valid;
};

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const initialValue = { name: '', email: '', date: '' };

export const AddNewEventForm: FunctionComponent = (): ReactElement => {
  // const { register, handleSubmit, errors, watch } = useForm();
  const [inputs, setInputs] = useState<EventProps>(initialValue);
  const [errors, setErrors] = useState<EventProps>(initialValue);

  const history = useHistory();

  const { data, status, executeRequest, error } = useHttpClient(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/addNewEvent`,
    {
      method: 'POST',
      body: { name: inputs.name, email: inputs.email, date: inputs.date },
      options: {
        headers: {
          'Content-type': 'application/json',
        },
      },
    },
  );
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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    validateForm(errors, inputs) && executeRequest();
  };

  if (data && data.eventId) {
    history.push({ pathname: `/event/${data.eventId}` });
  }

  if (status === 'pending') {
    return <LoadingBar />;
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Event</h2>
      {error && <ErrorAlert errorMessage={error} />}
      <div className="form--item">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
          className="form--input"
        />
        <ErrorAlert errorMessage={errors.name} />
      </div>
      <div className="form--item">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
          className="form--input"
        />
        <ErrorAlert errorMessage={errors.email} />
      </div>
      <div className="form--item">
        <DatePicker
          name="event date"
          onChange={(_date: any, dateString: string): any =>
            dateString === ''
              ? setErrors({ ...errors, date: 'Date is required' })
              : (setInputs({ ...inputs, date: dateString }), setErrors({ ...errors, date: '' }))
          }
          style={{ width: '200px' }}
          size="large"
        />
        <ErrorAlert errorMessage={errors.date} />
      </div>
      <Button
        type="primary"
        htmlType="submit"
        className="btn-form"
        disabled={!validateForm(errors, inputs)}
      >
        Add event
      </Button>
    </form>
  );
};
