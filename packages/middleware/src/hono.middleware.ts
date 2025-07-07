import type { IMiddleware } from 'honestjs'
import type { Context, MiddlewareHandler, Next } from 'hono'

export class HonoMiddleware implements IMiddleware {
	constructor(private readonly middleware: MiddlewareHandler) {}

	async use(c: Context, next: Next): Promise<Response | void> {
		return this.middleware(c, next)
	}
}
