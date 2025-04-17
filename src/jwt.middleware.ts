import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { jwt } from 'hono/jwt'

/**
 * Type for JWT authentication middleware parameters
 */
export type JwtParams = Parameters<typeof jwt>

/**
 * Middleware that provides JSON Web Token (JWT) authentication
 * @implements {IMiddleware}
 */
export class JwtMiddleware implements IMiddleware {
	private readonly args: JwtParams

	/**
	 * Creates a new JWT middleware instance
	 * @param {...JwtParams} args - JWT configuration parameters
	 */
	constructor(...args: JwtParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return jwt(...this.args)(c, next)
	}
}
