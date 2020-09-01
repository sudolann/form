import React, { FunctionComponent, ReactElement } from 'react';
import './ErrorAlert.scss';

export const ErrorAlert: FunctionComponent<{
  errorMessage: string;
}> = ({ errorMessage }): ReactElement => {
  return (
    <div>
      <p className="alert">{errorMessage}</p>
    </div>
  );
};
