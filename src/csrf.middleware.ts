import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { csrf } from 'hono/csrf'

/**
 * Type for CSRF protection middleware parameters
 */
export type CsrfParams = Parameters<typeof csrf>

/**
 * Middleware that provides Cross-Site Request Forgery (CSRF) protection
 * @implements {IMiddleware}
 */
export class CsrfMiddleware implements IMiddleware {
	private readonly args: CsrfParams

	/**
	 * Creates a new CSRF protection middleware instance
	 * @param {...CsrfParams} args - CSRF protection configuration parameters
	 */
	constructor(...args: CsrfParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return csrf(...this.args)(c, next)
	}
}
