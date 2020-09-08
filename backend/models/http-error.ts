class HttpError extends Error {
  code: any;
  constructor(message: string | undefined, errorCode: number = 500) {
    super(message);
    this.code = errorCode;
  }
}

export default HttpError;
