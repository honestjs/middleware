import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'

export type JsxRendererParams = Parameters<typeof jsxRenderer>

export class JsxRendererMiddleware implements IMiddleware {
	private readonly args: JsxRendererParams

	constructor(...args: JsxRendererParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return jsxRenderer(...this.args)(c, next)
	}
}
