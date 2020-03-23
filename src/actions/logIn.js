import { NetworkError, AuthorizationError } from "./errors";

/**
 * Logs a user into the app
 *
 * @returns {string} the user's token
 * @throws {AuthorizationError} if the user is not authorized to access the scanner
 * app (i.e. if the user is not an organizer)
 * @throws {NetworkError} if requests completes with a bad status code
 * @throws {Error} if there is an error fetching or parsing the response
 */
export default async function logIn(username, password) {
  // TODO: replace with an actual fetch call
  const response = {
    json: async () => "dummy user token",
    status: 200,
    ok: true,
  };

  // Fail if the response is bad
  if (response.status === 403) {
    throw new AuthorizationError("Must be an organizer to log in");
  } else if (!response.ok) {
    throw new NetworkError(`Unexpected error (HTTP ${response.status})`);
  }

  // Otherwise, return the user's token (this step could fail and throw a parsing error)
  const userToken = response.json();
  return userToken;
}
