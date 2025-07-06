import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { basicAuth } from 'hono/basic-auth'

export type BasicAuthParams = Parameters<typeof basicAuth>

export class BasicAuthMiddleware implements IMiddleware {
	private readonly args: BasicAuthParams

	constructor(...args: BasicAuthParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return basicAuth(...this.args)(c, next)
	}
}
