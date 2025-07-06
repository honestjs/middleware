import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { jwt } from 'hono/jwt'

export type JwtParams = Parameters<typeof jwt>

export class JwtMiddleware implements IMiddleware {
	private readonly args: JwtParams

	constructor(...args: JwtParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return jwt(...this.args)(c, next)
	}
}
