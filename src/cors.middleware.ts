import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { cors } from 'hono/cors'

/**
 * Type for CORS middleware parameters
 */
export type CorsParams = Parameters<typeof cors>

/**
 * Middleware that enables Cross-Origin Resource Sharing (CORS)
 * @implements {IMiddleware}
 */
export class CorsMiddleware implements IMiddleware {
	private readonly args: CorsParams

	/**
	 * Creates a new CORS middleware instance
	 * @param {...CorsParams} args - CORS configuration parameters
	 */
	constructor(...args: CorsParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return cors(...this.args)(c, next)
	}
}
