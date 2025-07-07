import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { cache } from 'hono/cache'

export type CacheParams = Parameters<typeof cache>

export class CacheMiddleware implements IMiddleware {
	private readonly args: CacheParams

	constructor(...args: CacheParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return cache(...this.args)(c, next)
	}
}
