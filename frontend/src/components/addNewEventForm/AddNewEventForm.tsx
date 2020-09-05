import React, { FunctionComponent, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../errorAlert/ErrorAlert";
import { LoadingBar } from "../loadingBar/LoadingBar";
import { useHttpClient } from "../../hooks/useHttpClient";
import { useHistory } from "react-router";
import { Button, DatePicker } from "antd";
import "./AddNewEventForm.scss";

type SubmittedData = { [s: string]: string };


export const AddNewEventForm: FunctionComponent = (): ReactElement => {
  const { register, handleSubmit, errors } = useForm();
  const [date, setDate] = useState<string | undefined>();
  const [newEventId, setNewEventId] = useState<string | null>(null);
  const history = useHistory();
  const { isLoading, error, sendRequest, setError } = useHttpClient();

  const addNewNewEvent = async (
    name: string,
    email: string,
    date: string
  ): Promise<void> => {
    try {
      const responseData = await sendRequest(
        `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/addNewEvent`,
        "POST",
        JSON.stringify({
          name,
          email,
          date,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setNewEventId(responseData.eventId);
    } catch (err) {
      setError(err.message);
    }
  };
  const onSubmit = (data: SubmittedData): void => {
    const { name, email } = data;
    date && addNewNewEvent(name, email, date)
  };

  if (newEventId) {
    history.push({ pathname: `/event/${newEventId}` });
  }
  


  if (isLoading) {
    return <LoadingBar />;
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Add New Event</h2>
      {error && <ErrorAlert errorMessage={error}/>}
      <div className="form--item">
        <input
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: "Name is required", minLength: 3 })}
          className="form--input"
        />
        {errors.name && <ErrorAlert errorMessage="Name is required" />}
      </div>
      <div className="form--item">
        <input
          type="text"
          name="email"
          placeholder="Email"
          ref={register({
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
          className="form--input"
        />
        {errors.email && <ErrorAlert errorMessage={errors.email.message} />}
      </div>

      <div className="form--item">
        <DatePicker
            name="startDate"
            onChange={(_date: any, dateString: string):void=> setDate(dateString)}
            style={{width: '200px'}}
            size="large"
        />
        {Object.values(errors).length > 0 && !date && <ErrorAlert errorMessage="Date is required" />}

      </div>

    <Button type='primary' htmlType='submit' className="btn-form">
        Add event
    </Button>
    </form>
  );
};
