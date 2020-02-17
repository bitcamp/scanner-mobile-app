/* eslint-disable max-classes-per-file */

/** To be used when there is an error with the network (i.e. WI-FI cuts out) */
export class NetworkError extends Error {}

/** To be used when there is an error due to improper credentials */
export class AuthorizationError extends Error {}
