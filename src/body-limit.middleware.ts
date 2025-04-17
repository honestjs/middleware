import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { bodyLimit } from 'hono/body-limit'

/**
 * Type for Body Limit middleware parameters
 */
export type BodyLimitParams = Parameters<typeof bodyLimit>

/**
 * Middleware that limits the size of request bodies
 * @implements {IMiddleware}
 */
export class BodyLimitMiddleware implements IMiddleware {
	private readonly args: BodyLimitParams

	/**
	 * Creates a new Body Limit middleware instance
	 * @param {...BodyLimitParams} args - Body Limit configuration parameters
	 */
	constructor(...args: BodyLimitParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return bodyLimit(...this.args)(c, next)
	}
}
