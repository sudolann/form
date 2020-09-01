class HttpError extends Error {
  code: any;
  constructor(message: string | undefined, errorCode: any) {
    super(message);
    this.code = errorCode;
  }
}

export default HttpError;
