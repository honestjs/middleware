import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { basicAuth } from 'hono/basic-auth'

/**
 * Type for Basic Authentication middleware parameters
 */
export type BasicAuthParams = Parameters<typeof basicAuth>

/**
 * Middleware that provides HTTP Basic Authentication
 * @implements {IMiddleware}
 */
export class BasicAuthMiddleware implements IMiddleware {
	private readonly args: BasicAuthParams

	/**
	 * Creates a new Basic Auth middleware instance
	 * @param {...BasicAuthParams} args - Basic Auth configuration parameters
	 */
	constructor(...args: BasicAuthParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return basicAuth(...this.args)(c, next)
	}
}
