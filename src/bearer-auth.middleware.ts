import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

/**
 * Type for Bearer Authentication middleware parameters
 */
export type BearerAuthParams = Parameters<typeof bearerAuth>

/**
 * Middleware that provides HTTP Bearer Authentication
 * @implements {IMiddleware}
 */
export class BearerAuthMiddleware implements IMiddleware {
	private readonly args: BearerAuthParams

	/**
	 * Creates a new Bearer Auth middleware instance
	 * @param {...BearerAuthParams} args - Bearer Auth configuration parameters
	 */
	constructor(...args: BearerAuthParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return bearerAuth(...this.args)(c, next)
	}
}
