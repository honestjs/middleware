import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { logger } from 'hono/logger'

export type LoggerParams = Parameters<typeof logger>

export class LoggerMiddleware implements IMiddleware {
	private readonly args: LoggerParams

	constructor(...args: LoggerParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return logger(...this.args)(c, next)
	}
}
