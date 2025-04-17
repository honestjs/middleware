import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { timeout } from 'hono/timeout'

/**
 * Type for Timeout middleware parameters
 */
export type TimeoutParams = Parameters<typeof timeout>

/**
 * Middleware that adds a timeout to the request processing
 * @implements {IMiddleware}
 */
export class TimeoutMiddleware implements IMiddleware {
	private readonly args: TimeoutParams

	/**
	 * Creates a new Timeout middleware instance
	 * @param {...TimeoutParams} args - Timeout configuration parameters
	 */
	constructor(...args: TimeoutParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return timeout(...this.args)(c, next)
	}
}
