import React, { FunctionComponent, ReactElement } from 'react';
import './ErrorAlert.scss';

export const ErrorAlert: FunctionComponent<{
  errorMessage: string;
  fullPage?: boolean;
}> = ({ errorMessage, fullPage }): ReactElement => {
  if (fullPage) {
    return (
      <div className="flex" data-testid="error">
        <p className="alert">{errorMessage}</p>
      </div>
    );
  }

  return (
    <p className="alert" data-testid="error">
      {errorMessage}
    </p>
  );
};
