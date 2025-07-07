import type { IMiddleware } from 'honestjs'
import type { Context, Next } from 'hono'
import { languageDetector } from 'hono/language'

export type LanguageDetectorParams = Parameters<typeof languageDetector>

export class LanguageDetectorMiddleware implements IMiddleware {
	private readonly args: LanguageDetectorParams

	constructor(...args: LanguageDetectorParams) {
		this.args = args
	}

	async use(c: Context, next: Next): Promise<Response | void> {
		return languageDetector(...this.args)(c, next)
	}
}
