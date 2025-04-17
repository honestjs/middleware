import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'

/**
 * Middleware that removes trailing slashes from URLs
 * @implements {IMiddleware}
 */
export class TrimTrailingSlashMiddleware implements IMiddleware {
	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return trimTrailingSlash()(c, next)
	}
}
