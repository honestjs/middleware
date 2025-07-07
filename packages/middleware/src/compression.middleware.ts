import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { compress } from 'hono/compress'

export type CompressionParams = Parameters<typeof compress>

export class CompressionMiddleware implements IMiddleware {
	private readonly args: CompressionParams

	constructor(...args: CompressionParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return compress(...this.args)(c, next)
	}
}
