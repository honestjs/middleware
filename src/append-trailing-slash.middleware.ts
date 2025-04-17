import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { appendTrailingSlash } from 'hono/trailing-slash'

/**
 * Middleware that appends a trailing slash to URLs
 * @implements {IMiddleware}
 */
export class AppendTrailingSlashMiddleware implements IMiddleware {
	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return appendTrailingSlash()(c, next)
	}
}
