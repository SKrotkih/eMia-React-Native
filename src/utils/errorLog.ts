import { IS_ERRORS_LOG_SET_UP } from '../config/constants';

// We don't send the following errors to Log
const UNTRACKED_ERRORS = [
	'Permission was denied',
];

/**
 * Save  error in to Log.
 *
 */
export function errorLog(namespace: string) {
	return function (error: Error): void {
		if (
			IS_ERRORS_LOG_SET_UP &&
			!UNTRACKED_ERRORS.some((msg) => error.message.includes(msg))
		) {
			// Here we can send message about error to our Server
			// Server.captureException(error);
		}
		console.log(`[${namespace}]: ${error.message}`);
	};
}
