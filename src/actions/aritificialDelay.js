/**
 * Asynchronously waits for a promise to resolve
 * @param {number} [duration = 1000] the amount of time to delay
 */
export default async function artificialDelay(duration = 1000) {
  await new Promise(resolve => setTimeout(resolve, duration));
}
