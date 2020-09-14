import { CircularProgress } from '@material-ui/core';
import React, { FunctionComponent, ReactElement } from 'react';

export const LoadingBar: FunctionComponent = (): ReactElement => (
  <div className="loading" data-testid="loading">
    <CircularProgress disableShrink />
  </div>
);
