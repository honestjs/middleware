import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { ipRestriction } from 'hono/ip-restriction'

/**
 * Type for IP Restriction middleware parameters
 */
export type IpRestrictionParams = Parameters<typeof ipRestriction>

/**
 * Middleware that restricts access based on client IP addresses
 * @implements {IMiddleware}
 */
export class IpRestrictionMiddleware implements IMiddleware {
	private readonly args: IpRestrictionParams

	/**
	 * Creates a new IP Restriction middleware instance
	 * @param {...IpRestrictionParams} args - IP Restriction configuration parameters
	 */
	constructor(...args: IpRestrictionParams) {
		this.args = args
	}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		return ipRestriction(...this.args)(c, next)
	}
}
