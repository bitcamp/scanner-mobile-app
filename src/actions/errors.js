/* eslint-disable max-classes-per-file */

/** The base class for all custom errors. */
export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "CustomError";
  }
}

/** To be used when there is an error with the network (i.e. WI-FI cuts out) */
export class NetworkError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "NetworkError";
  }
}

/** To be used when there is an error due to improper credentials */
export class AuthorizationError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "AuthorizationError";
  }
}

/** To be used when there is an error due to illegal arguments to a function */
export class IllegalArgumentError extends CustomError {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "IllegalArgumentError";
  }
}

/**
 * @param {Error} error the error that was encountered
 * @returns an error message based on the error's type
 */
export function getErrorMessage(error) {
  return error ? error.toString() : "Error";
}
