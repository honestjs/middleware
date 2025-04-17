import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { cache } from 'hono/cache'

/**
 * Type for Cache middleware parameters
 */
export type CacheParams = Parameters<typeof cache>

/**
 * Middleware that enables HTTP caching for responses
 * @implements {IMiddleware}
 */
export class CacheMiddleware implements IMiddleware {
	private readonly args: CacheParams

	/**
	 * Creates a new Cache middleware instance
	 * @param {...CacheParams} args - Cache configuration parameters
	 */
	constructor(...args: CacheParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return cache(...this.args)(c, next)
	}
}
