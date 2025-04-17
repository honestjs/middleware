import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { requestId } from 'hono/request-id'

/**
 * Type for Request ID middleware parameters
 */
export type RequestIdParams = Parameters<typeof requestId>

/**
 * Middleware that adds a unique request ID to each request
 * @implements {IMiddleware}
 */
export class RequestIdMiddleware implements IMiddleware {
	private readonly args: RequestIdParams

	/**
	 * Creates a new Request ID middleware instance
	 * @param {...RequestIdParams} args - Request ID configuration parameters
	 */
	constructor(...args: RequestIdParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return requestId(...this.args)(c, next)
	}
}
