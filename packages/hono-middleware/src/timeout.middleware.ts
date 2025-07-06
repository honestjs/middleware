import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { timeout } from 'hono/timeout'

export type TimeoutParams = Parameters<typeof timeout>

export class TimeoutMiddleware implements IMiddleware {
	private readonly args: TimeoutParams

	constructor(...args: TimeoutParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return timeout(...this.args)(c, next)
	}
}
