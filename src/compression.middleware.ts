import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { compress } from 'hono/compress'

/**
 * Type for Compression middleware parameters
 */
export type CompressionParams = Parameters<typeof compress>

/**
 * Middleware that compresses response bodies
 * @implements {IMiddleware}
 */
export class CompressionMiddleware implements IMiddleware {
	private readonly args: CompressionParams

	/**
	 * Creates a new Compression middleware instance
	 * @param {...CompressionParams} args - Compression configuration parameters
	 */
	constructor(...args: CompressionParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return compress(...this.args)(c, next)
	}
}
