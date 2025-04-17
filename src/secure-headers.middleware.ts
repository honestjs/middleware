import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { secureHeaders } from 'hono/secure-headers'

/**
 * Type for Secure Headers middleware parameters
 */
export type SecureHeadersParams = Parameters<typeof secureHeaders>

/**
 * Middleware that adds security-related HTTP headers to responses
 * @implements {IMiddleware}
 */
export class SecureHeadersMiddleware implements IMiddleware {
	private readonly args: SecureHeadersParams

	/**
	 * Creates a new Secure Headers middleware instance
	 * @param {...SecureHeadersParams} args - Secure Headers configuration parameters
	 */
	constructor(...args: SecureHeadersParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return secureHeaders(...this.args)(c, next)
	}
}
