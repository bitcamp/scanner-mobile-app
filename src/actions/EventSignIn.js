import artificialDelay from "./aritificialDelay";
import mockSchedule from "../mockData/mockSchedule";

/**
 * Returns a list of all of the events
 *
 * @throws Throws an error if the network request fails (e.g. if WI-FI cuts out)
 * @returns {*} The list of events
 */
export async function fetchEvents() {
  try {
    // Make an unauthenticated fetch request to the backend
    // TODO: Throw an error if the data is malformed
  } catch (e) {
    // TODO: catch the error, analyze it, then output a descriptive error
  }

  // TODO: remove
  await artificialDelay();

  return mockSchedule;
}

/**
 * Signs a user into the specified event
 *
 * @param {string} userId The id of the user who is signing in
 * @param {string|number} eventId The id of the event to which the user is signing in
 */
export async function attendEvent(userId, eventId) {
  // eslint-disable-next-line no-console
  console.warn("Signing user into", eventId); // TODO: REMOVE once the API request is implemented
}
