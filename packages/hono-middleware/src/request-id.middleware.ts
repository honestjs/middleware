import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { requestId } from 'hono/request-id'

export type RequestIdParams = Parameters<typeof requestId>

export class RequestIdMiddleware implements IMiddleware {
	private readonly args: RequestIdParams

	constructor(...args: RequestIdParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return requestId(...this.args)(c, next)
	}
}
