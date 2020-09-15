import React, {FunctionComponent, ReactElement} from 'react'
import {ErrorAlert} from '../errorAlert/ErrorAlert'
import {EventProps} from '../eventById/EventById'
import {LoadingBar} from '../loadingBar/LoadingBar'
import {EventListItem} from '../eventListItem/EventListItem'
import './EventsList.scss'
import {useHttpClient} from '../../hooks/useHttpClient'

export interface EventPropsState extends EventProps {
  _id: string
}

export const EventsList: FunctionComponent = (): ReactElement => {
  const {
    data,
    status,
    error,
  } = useHttpClient(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/events`,
    {onRender: true},
  )

  if (status === 'pending') {
    return <LoadingBar />
  }
  if (error && status === 'rejected') {
    return <ErrorAlert errorMessage={error} fullPage />
  }
  return (
    <ul className="list">
      <h1>Events List</h1>
      {data &&
        data.map((event: EventPropsState, index: number) => {
          const {name, date, email, _id} = event
          return (
            <EventListItem name={name} date={date} email={email} key={_id} />
          )
        })}
    </ul>
  )
}
