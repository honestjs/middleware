import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'

export type BearerAuthParams = Parameters<typeof bearerAuth>

export class BearerAuthMiddleware implements IMiddleware {
	private readonly args: BearerAuthParams

	constructor(...args: BearerAuthParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return bearerAuth(...this.args)(c, next)
	}
}
