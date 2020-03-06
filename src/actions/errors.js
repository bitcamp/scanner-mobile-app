/* eslint-disable max-classes-per-file */

/** The base class for all custom errors. */
export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

/** To be used when there is an error with the network (i.e. WI-FI cuts out) */
export class NetworkError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

/** To be used when there is an error due to improper credentials */
export class AuthorizationError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

/** To be used when there is an error due to illegal arguments to a function */
export class IllegalArgumentError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}
