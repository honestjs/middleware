import type { IMiddleware } from 'honestjs'
import type { Context, MiddlewareHandler, Next } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { bearerAuth } from 'hono/bearer-auth'
import { bodyLimit } from 'hono/body-limit'
import { cache } from 'hono/cache'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { ipRestriction } from 'hono/ip-restriction'
import { jwt } from 'hono/jwt'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'
import { timeout } from 'hono/timeout'
import { appendTrailingSlash, trimTrailingSlash } from 'hono/trailing-slash'

export class HonoMiddleware implements IMiddleware {
	constructor(private readonly middleware: MiddlewareHandler) {}

	async use(c: Context, next: Next): Promise<Response | void> {
		return this.middleware(c, next)
	}
}

export class AppendTrailingSlashMiddleware implements IMiddleware {
	async use(c: Context, next: Next): Promise<Response | void> {
		return appendTrailingSlash()(c, next)
	}
}

export type BasicAuthParams = Parameters<typeof basicAuth>

export class BasicAuthMiddleware implements IMiddleware {
	private readonly args: BasicAuthParams

	constructor(...args: BasicAuthParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return basicAuth(...this.args)(c, next)
	}
}

export type BearerAuthParams = Parameters<typeof bearerAuth>

export class BearerAuthMiddleware implements IMiddleware {
	private readonly args: BearerAuthParams

	constructor(...args: BearerAuthParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return bearerAuth(...this.args)(c, next)
	}
}

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

export type CacheParams = Parameters<typeof cache>

export class CacheMiddleware implements IMiddleware {
	private readonly args: CacheParams

	constructor(...args: CacheParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return cache(...this.args)(c, next)
	}
}

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

export type CorsParams = Parameters<typeof cors>

export class CorsMiddleware implements IMiddleware {
	private readonly args: CorsParams

	constructor(...args: CorsParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return cors(...this.args)(c, next)
	}
}

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

export class TrimTrailingSlashMiddleware implements IMiddleware {
	async use(c: Context, next: Next): Promise<Response | void> {
		return trimTrailingSlash()(c, next)
	}
}
