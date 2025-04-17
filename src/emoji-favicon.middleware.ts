import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'

/**
 * Middleware that serves an emoji as a favicon
 * @implements {IMiddleware}
 */
export class EmojiFavicon implements IMiddleware {
	/**
	 * Creates a new emoji favicon middleware instance
	 * @param {string} emoji - The emoji character to use as favicon
	 */
	constructor(private readonly emoji: string) {}

	/**
	 * Executes the middleware
	 * @param {Context} c - The Hono context
	 * @param {Next} next - The next middleware function
	 * @returns {Promise<Response | void>} The response or void if passed to next middleware
	 */
	async use(c: Context, next: Next): Promise<Response | void> {
		if (c.req.path === '/favicon.ico') {
			c.header('Content-Type', 'image/svg+xml')
			return c.body(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" x="-0.1em" font-size="90">${this.emoji}</text></svg>`
			)
		}
		return next()
	}
}
