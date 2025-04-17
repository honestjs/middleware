<p align="center">
  <a href="https://github.com/honestjs/" target="blank"><img src="https://avatars.githubusercontent.com/u/197956909" width="120" alt="Honest Logo" /></a>
</p>
<p align="center">
Collection of middleware for HonestJS - a modern web framework built on top of Hono.
</p>

## Installation

```bash
bun add @honestjs/middleware
# or
pnpm add @honestjs/middleware
# or
yarn add @honestjs/middleware
# or
npm install @honestjs/middleware
```

## Available Middleware

The package includes the following middleware:

- **[AppendTrailingSlash](https://hono.dev/docs/middleware/builtin/trailing-slash)**: Appends a trailing slash to URLs
- **[BasicAuth](https://hono.dev/docs/middleware/builtin/basic-auth)**: Adds HTTP basic authentication
- **[BearerAuth](https://hono.dev/docs/middleware/builtin/bearer-auth)**: Implements bearer token authentication
- **[BodyLimit](https://hono.dev/docs/middleware/builtin/body-limit)**: Limits the size of request bodies
- **[Cache](https://hono.dev/docs/middleware/builtin/cache)**: Provides HTTP caching capabilities
- **[Compression](https://hono.dev/docs/middleware/builtin/compress)**: Compresses HTTP responses
- **[Cors](https://hono.dev/docs/middleware/builtin/cors)**: Enables Cross-Origin Resource Sharing
- **[Csrf](https://hono.dev/docs/middleware/builtin/csrf)**: Protects against CSRF attacks
- **EmojiFavicon**: Sets an emoji as the favicon
- **HonoMiddleware**: Wraps native Hono middleware handlers
- **[IpRestriction](https://hono.dev/docs/middleware/builtin/ip-restriction)**: Restricts access based on IP addresses
- **[Jwt](https://hono.dev/docs/middleware/builtin/jwt)**: Handles JWT authentication
- **[RequestId](https://hono.dev/docs/middleware/builtin/request-id)**: Adds a unique ID to each request
- **[SecureHeaders](https://hono.dev/docs/middleware/builtin/secure-headers)**: Sets security-related HTTP headers
- **[Timeout](https://hono.dev/docs/middleware/builtin/timeout)**: Adds request timeout functionality
- **[TrimTrailingSlash](https://hono.dev/docs/middleware/builtin/trailing-slash)**: Removes trailing slashes from URLs

## Usage Example

```typescript
import { honest } from 'honestjs'
import AppModule from './app.module'
import { EmojiFavicon, CorsMiddleware } from '@honestjs/middleware'

const { hono } = await Application.create(AppModule, {
	components: {
		middleware: [
			new EmojiFavicon('🔥'),
			new CorsMiddleware({
				origin: ['https://example.com'],
				allowMethods: ['GET', 'POST']
			})
		]
	}
})

export default hono
```

## Using HonoMiddleware

The `HonoMiddleware` class allows you to use native Hono middleware within the HonestJS framework:

```typescript
import { honest } from 'honestjs'
import AppModule from './app.module'
import { timeout } from 'hono/timeout'
import { HonoMiddleware } from '@honestjs/middleware'

const { hono } = await Application.create(AppModule, {
	components: {
		middleware: [new HonoMiddleware(timeout(100))]
	}
})

export default hono
```

## License

MIT © [Orkhan Karimov](https://github.com/kerimovok)
