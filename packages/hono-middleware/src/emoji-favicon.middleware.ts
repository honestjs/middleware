import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'

export class EmojiFavicon implements IMiddleware {
	constructor(private readonly emoji: string) {}

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
