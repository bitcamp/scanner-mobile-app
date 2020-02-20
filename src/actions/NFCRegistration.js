/* eslint-disable no-unused-vars */
// This is disabled until we actually start using the arguments
// passed into these functions

/**
 * Validates a user's QR code
 *
 * @param {Object} qrData The data obtained by scanning a user's QR code
 * @param {string} authToken The current organizer's auth token
 * @throws Throws an error if the network request fails (i.e. if WI-FI cuts out, if the
 * qr data isn't valid, etc.)
 * @returns {Object} All of a user's data from the backend
 */
export async function validateQRCode(qrData, authToken) {
  // TODO: ensure the qrData matches the approriate regex

  try {
    // Make an authenticated fetch request to the backend
  } catch (e) {
    // Catch the error, analyze it, then output a descriptive error
  }

  // TODO: remove this artificial delay
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  // Returns the user data
  return {
    name: "Danny DeVito",
    minor: false,
    email: "danny@devito.com",
    id: "abcd123",
  };
}

/**
 * Registers an NFC wristband with a given user
 *
 * @param {string} userID The user's unique identifier (obtained from the backend)
 * @param {Object} nfcData The data obtained by scanning the nfc chip
 * @param {string} authToken The current organizer's auth token
 * @throws Throws an error if there is an issue with registering the NFC wristband.
 * (i.e. a network error, if the NFC data is invalid)
 * @returns {boolean} Whether or not registration was successful
 */
export async function registerNfcBand(userID, nfcData, authToken) {
  // TODO: ensure the nfcData matches the approriate regex

  try {
    // Make an authenticated fetch request to the backend
  } catch (e) {
    // Catch the error, analyze it, then output a descriptive error
  }

  // TODO: remove this artificial delay
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  // Returns the user data
  return true;
}
