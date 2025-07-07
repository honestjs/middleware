import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { cors } from 'hono/cors'

export type CorsParams = Parameters<typeof cors>

export class CorsMiddleware implements IMiddleware {
	private readonly args: CorsParams

	constructor(...args: CorsParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return cors(...this.args)(c, next)
	}
}
