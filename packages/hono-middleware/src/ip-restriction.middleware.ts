import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { ipRestriction } from 'hono/ip-restriction'

export type IpRestrictionParams = Parameters<typeof ipRestriction>

export class IpRestrictionMiddleware implements IMiddleware {
	private readonly args: IpRestrictionParams

	constructor(...args: IpRestrictionParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return ipRestriction(...this.args)(c, next)
	}
}
