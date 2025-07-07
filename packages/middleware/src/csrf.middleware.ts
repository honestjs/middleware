import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { csrf } from 'hono/csrf'

export type CsrfParams = Parameters<typeof csrf>

export class CsrfMiddleware implements IMiddleware {
	private readonly args: CsrfParams

	constructor(...args: CsrfParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return csrf(...this.args)(c, next)
	}
}
