import React, { FunctionComponent, ReactElement, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorAlert } from '../errorAlert/ErrorAlert';
import { LoadingBar } from '../loadingBar/LoadingBar';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useHistory } from 'react-router';
import { Button, DatePicker } from 'antd';
import './AddNewEventForm.scss';

// type SubmittedData = { [s: string]: string };

export const AddNewEventForm: FunctionComponent = (): ReactElement => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [date, setDate] = useState<string | undefined>();
  const history = useHistory();
  const { name, email } = watch();
  const { data, status, executeRequest, error } = useHttpClient(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/addNewEvent`,
    {
      method: 'POST',
      body: { name, email, date },
      options: {
        headers: {
          'Content-type': 'application/json',
        },
      },
    },
  );

  const onSubmit = (): any => date && executeRequest();

  if (data && data.eventId) {
    history.push({ pathname: `/event/${data.eventId}` });
  }

  if (status === 'pending') {
    return <LoadingBar />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Add New Event</h2>
      {error && <ErrorAlert errorMessage={error} />}
      <div className="form--item">
        <input
          type="text"
          name="name"
          placeholder="Name"
          ref={register({
            required: 'Name is required',
            minLength: 3,
          })}
          className="form--input"
        />
        {errors.name && <ErrorAlert errorMessage={errors.name.message} />}
        {errors.name && errors.name.type === 'minLength' && (
          <ErrorAlert errorMessage="Min three letters name" />
        )}
      </div>
      <div className="form--item">
        <input
          type="text"
          name="email"
          placeholder="Email"
          ref={register({
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="form--input"
        />
        {errors.email && <ErrorAlert errorMessage={errors.email.message} />}
      </div>
      <div className="form--item">
        <DatePicker
          name="event date"
          onChange={(_date: any, dateString: string): void => setDate(dateString)}
          style={{ width: '200px' }}
          size="large"
        />
        {Object.values(errors).length > 0 && !date && (
          <ErrorAlert errorMessage="Date is required" />
        )}
      </div>
      <Button type="primary" htmlType="submit" className="btn-form">
        Add event
      </Button>
    </form>
  );
};
