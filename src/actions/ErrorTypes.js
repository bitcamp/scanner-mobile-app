/* eslint-disable max-classes-per-file */

/** To be used when there is an error with the network (i.e. WI-FI cuts out) */
export class NetworkError extends Error {}

/** To be used when there is an error due to improper credentials */
export class AuthorizationError extends Error {}

/** To be used when there is an error due to illegal arguments to a function */
export class IllegalArgumentError extends Error {}

/**
 * @param error the error that was encountered
 * @returns an error message based on the error's type
 */
export function getErrorMessage(error) {
  let errorText;
  if (error instanceof NetworkError) {
    errorText = "a Network Error";
  } else if (error instanceof AuthorizationError) {
    errorText = "an Authorization Error";
  } else {
    errorText = "an Error";
  }

  return `Encountered ${errorText}`;
}
