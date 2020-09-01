import React, { FunctionComponent, ReactElement } from "react";
import { Box } from "@material-ui/core";
import "./ErrorAlert.scss";

export const ErrorAlert: FunctionComponent<{ errorMessage: string }> = ({
  errorMessage,

}): ReactElement =>  (
  <p className="alert">{errorMessage}</p>
)
