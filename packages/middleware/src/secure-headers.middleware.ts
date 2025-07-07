import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { secureHeaders } from 'hono/secure-headers'

export type SecureHeadersParams = Parameters<typeof secureHeaders>

export class SecureHeadersMiddleware implements IMiddleware {
	private readonly args: SecureHeadersParams

	constructor(...args: SecureHeadersParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return secureHeaders(...this.args)(c, next)
	}
}
