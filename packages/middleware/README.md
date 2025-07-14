# HonestJS Middleware

Hono middleware adapter for HonestJS framework, providing seamless integration with all Hono's built-in middleware.

**📖 [Hono Middleware Guide](https://hono.dev/docs/guides/middleware)** | **🔧
[Built-in Middleware](https://hono.dev/docs/middleware/builtin/basic-auth)**

> ⚠️ **Documentation is not yet complete** ⚠️
>
> If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Installation

```bash
bun add @honestjs/middleware
```

## Basic Usage

### Method 1: HonestJS Application Configuration

```typescript
import { Application } from 'honestjs'
import { CorsMiddleware, LoggerMiddleware, SecureHeadersMiddleware } from '@honestjs/middleware'

const { hono } = await Application.create(AppModule, {
	components: {
		middleware: [
			new LoggerMiddleware(),
			new CorsMiddleware({ origin: 'https://example.com' }),
			new SecureHeadersMiddleware()
		]
	}
})
```

### Method 2: Direct Hono Registration

```typescript
import { EmojiFavicon, LoggerMiddleware } from '@honestjs/middleware'

hono.use('*', new LoggerMiddleware().use)
hono.use('*', new EmojiFavicon('🔥').use)
```

### HonoMiddleware

Wrap any Hono middleware for use with HonestJS.

```typescript
import { HonoMiddleware } from '@honestjs/middleware'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'

const { hono } = await Application.create(AppModule, {
	components: {
		middleware: [
			new HonoMiddleware(poweredBy())
			new HonoMiddleware(async (c, next) => {
				c.header('X-Custom-Header', 'Custom Value')
				await next()
			})
		]
	}
})
```

## License

MIT © [Orkhan Karimov](https://github.com/kerimovok)
