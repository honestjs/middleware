import type { IMiddleware } from 'honestjs'
import type { Context, MiddlewareHandler, Next } from 'hono'

/**
 * Middleware that wraps a Hono middleware handler
 * @implements {IMiddleware}
 */
export class HonoMiddleware implements IMiddleware {
	/**
	 * Creates a new Hono middleware wrapper instance
	 * @param {MiddlewareHandler} middleware - The Hono middleware handler to wrap
	 */
	constructor(private readonly middleware: MiddlewareHandler) {}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return this.middleware(c, next)
	}
}
