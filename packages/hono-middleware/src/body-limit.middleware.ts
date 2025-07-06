import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { bodyLimit } from 'hono/body-limit'

export type BodyLimitParams = Parameters<typeof bodyLimit>

export class BodyLimitMiddleware implements IMiddleware {
	private readonly args: BodyLimitParams

	constructor(...args: BodyLimitParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return bodyLimit(...this.args)(c, next)
	}
}
