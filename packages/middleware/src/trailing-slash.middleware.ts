import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { appendTrailingSlash, trimTrailingSlash } from 'hono/trailing-slash'

export class TrimTrailingSlashMiddleware implements IMiddleware {
	async use(c: Context, next: Next): Promise<Response | void> {
		return trimTrailingSlash()(c, next)
	}
}

export class AppendTrailingSlashMiddleware implements IMiddleware {
	async use(c: Context, next: Next): Promise<Response | void> {
		return appendTrailingSlash()(c, next)
	}
}
