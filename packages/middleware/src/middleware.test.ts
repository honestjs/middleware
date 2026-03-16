import { describe, expect, it } from 'vitest'
import { Hono } from 'hono'
import type { IMiddleware } from 'honestjs'
import { EmojiFavicon } from './emoji-favicon.middleware'
import { HonoMiddleware } from './hono.middleware'
import { LoggerMiddleware } from './logger.middleware'
import { CorsMiddleware } from './cors.middleware'
import { SecureHeadersMiddleware } from './secure-headers.middleware'
import {
	BasicAuthMiddleware,
	BearerAuthMiddleware,
	BodyLimitMiddleware,
	CacheMiddleware,
	CompressionMiddleware,
	CsrfMiddleware,
	IpRestrictionMiddleware,
	JsxRendererMiddleware,
	JwtMiddleware,
	LanguageDetectorMiddleware,
	RequestIdMiddleware,
	TimeoutMiddleware,
	TrimTrailingSlashMiddleware,
	AppendTrailingSlashMiddleware
} from './index'

function implementsIMiddleware(instance: unknown): instance is IMiddleware {
	return (
		typeof instance === 'object' &&
		instance !== null &&
		'use' in instance &&
		typeof (instance as any).use === 'function'
	)
}

describe('middleware classes implement IMiddleware', () => {
	const cases: [string, IMiddleware][] = [
		['EmojiFavicon', new EmojiFavicon('🚀')],
		[
			'HonoMiddleware',
			new HonoMiddleware(async (_c, next) => {
				await next()
			})
		],
		['LoggerMiddleware', new LoggerMiddleware()],
		['CorsMiddleware', new CorsMiddleware()],
		['SecureHeadersMiddleware', new SecureHeadersMiddleware()],
		['TrimTrailingSlashMiddleware', new TrimTrailingSlashMiddleware()],
		['AppendTrailingSlashMiddleware', new AppendTrailingSlashMiddleware()]
	]

	for (const [name, instance] of cases) {
		it(`${name} implements IMiddleware`, () => {
			expect(implementsIMiddleware(instance)).toBe(true)
		})
	}
})

describe('HonoMiddleware', () => {
	it('wraps a Hono handler correctly', async () => {
		let called = false
		const mw = new HonoMiddleware(async (_c, next) => {
			called = true
			await next()
		})

		const app = new Hono()
		app.use('*', (c, next) => mw.use(c, next))
		app.get('/', (c) => c.text('ok'))

		const res = await app.request(new Request('http://localhost/'))
		expect(res.status).toBe(200)
		expect(called).toBe(true)
	})
})

describe('EmojiFavicon', () => {
	it('returns SVG response for /favicon.ico', async () => {
		const mw = new EmojiFavicon('🎉')
		const app = new Hono()
		app.use('*', (c, next) => mw.use(c, next))
		app.get('/', (c) => c.text('home'))

		const res = await app.request(new Request('http://localhost/favicon.ico'))
		expect(res.status).toBe(200)
		expect(res.headers.get('Content-Type')).toBe('image/svg+xml')
		const body = await res.text()
		expect(body).toContain('🎉')
		expect(body).toContain('<svg')
	})

	it('passes through for non-favicon paths', async () => {
		const mw = new EmojiFavicon('🎉')
		const app = new Hono()
		app.use('*', (c, next) => mw.use(c, next))
		app.get('/', (c) => c.text('home'))

		const res = await app.request(new Request('http://localhost/'))
		expect(res.status).toBe(200)
		expect(await res.text()).toBe('home')
	})
})

describe('LoggerMiddleware', () => {
	it('calls through to Hono logger middleware', async () => {
		const mw = new LoggerMiddleware()
		const app = new Hono()
		app.use('*', (c, next) => mw.use(c, next))
		app.get('/', (c) => c.text('ok'))

		const res = await app.request(new Request('http://localhost/'))
		expect(res.status).toBe(200)
	})
})

describe('CorsMiddleware', () => {
	it('calls through to Hono cors middleware', async () => {
		const mw = new CorsMiddleware({ origin: '*' })
		const app = new Hono()
		app.use('*', (c, next) => mw.use(c, next))
		app.get('/', (c) => c.text('ok'))

		const res = await app.request(new Request('http://localhost/'))
		expect(res.status).toBe(200)
	})
})

describe('SecureHeadersMiddleware', () => {
	it('calls through to Hono secure-headers middleware', async () => {
		const mw = new SecureHeadersMiddleware()
		const app = new Hono()
		app.use('*', (c, next) => mw.use(c, next))
		app.get('/', (c) => c.text('ok'))

		const res = await app.request(new Request('http://localhost/'))
		expect(res.status).toBe(200)
	})
})
