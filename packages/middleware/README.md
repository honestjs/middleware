# @honestjs/middleware

Hono middleware adapter for HonestJS framework, providing seamless integration with all Hono's built-in middleware.

**📖 [Hono Middleware Guide](https://hono.dev/docs/guides/middleware)** | **🔧
[Built-in Middleware](https://hono.dev/docs/middleware/builtin/basic-auth)**

## Installation

```bash
bun add @honestjs/middleware
pnpm add @honestjs/middleware
yarn add @honestjs/middleware
npm install @honestjs/middleware
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

// Using .use method
hono.use('*', new LoggerMiddleware().use)
hono.use('*', new EmojiFavicon('🔥').use)

// Using middleware directly
hono.use(logger())
hono.use('/api/*', new CorsMiddleware({ origin: 'https://api.example.com' }).use)
```

## Middleware Reference

> 📚 **Documentation**: Each middleware section includes a link to the official Hono documentation for detailed
> information about the underlying middleware options and behavior.

### Authentication Middleware

#### BasicAuthMiddleware

HTTP Basic Authentication middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/basic-auth)**

```typescript
import { BasicAuthMiddleware } from '@honestjs/middleware'

// Simple username/password
new BasicAuthMiddleware({
	username: 'admin',
	password: 'secret'
})

// Multiple users
new BasicAuthMiddleware(
	{
		username: 'admin',
		password: 'admin-secret',
		realm: 'Admin Area'
	},
	{
		username: 'user',
		password: 'user-secret'
	}
)

// Custom verification
new BasicAuthMiddleware({
	verifyUser: async (username, password, c) => {
		// Custom user verification logic
		return await validateUser(username, password)
	},
	realm: 'Secure Area'
})
```

**Options:**

- `username` (string): Username for authentication
- `password` (string): Password for authentication
- `realm` (string): Authentication realm (default: "Secure Area")
- `verifyUser` (function): Custom verification function
- `hashFunction` (function): Custom hash function for password comparison
- `invalidUserMessage` (string|object|function): Custom error message

#### BearerAuthMiddleware

Bearer token authentication middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/bearer-auth)**

```typescript
import { BearerAuthMiddleware } from '@honestjs/middleware'

// Single token
new BearerAuthMiddleware({ token: 'your-secret-token' })

// Multiple tokens
new BearerAuthMiddleware({
	token: ['token1', 'token2', 'admin-token']
})

// Custom token verification
new BearerAuthMiddleware({
	verifyToken: async (token, c) => {
		return await validateToken(token)
	}
})
```

**Options:**

- `token` (string|string[]): Valid bearer token(s)
- `realm` (string): Authentication realm
- `prefix` (string): Token prefix (default: "Bearer")
- `headerName` (string): Header name (default: "Authorization")
- `verifyToken` (function): Custom token verification
- `hashFunction` (function): Hash function for token comparison

#### JwtMiddleware

JWT authentication middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/jwt)**

```typescript
import { JwtMiddleware } from '@honestjs/middleware'
import type { JwtVariables } from 'hono/jwt'

// Extend context types for JWT payload
declare module 'hono' {
	interface Variables extends JwtVariables {}
}

// Basic JWT
new JwtMiddleware({
	secret: 'your-jwt-secret'
})

// Advanced JWT configuration
new JwtMiddleware({
	secret: 'your-jwt-secret',
	alg: 'HS256', // HS256, HS384, HS512, RS256, RS384, RS512, PS256, PS384, PS512, ES256, ES384, ES512, EdDSA
	cookie: 'jwt-token', // Get token from cookie instead of header
	headerName: 'x-auth-token' // Custom header name
})

// Usage in route handler
app.get('/protected', (c) => {
	const payload = c.get('jwtPayload')
	return c.json({ user: payload.sub })
})
```

**Options:**

- `secret` (string): JWT secret key
- `alg` (string): JWT algorithm (default: "HS256")
- `cookie` (string): Cookie name for token retrieval
- `headerName` (string): Header name (default: "Authorization")

### Security Middleware

#### CorsMiddleware

Cross-Origin Resource Sharing middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/cors)**

```typescript
import { CorsMiddleware } from '@honestjs/middleware'

// Simple CORS
new CorsMiddleware()

// Custom CORS configuration
new CorsMiddleware({
	origin: 'https://example.com',
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization'],
	exposeHeaders: ['X-Custom-Header'],
	maxAge: 86400,
	credentials: true
})

// Multiple origins
new CorsMiddleware({
	origin: ['https://app.example.com', 'https://admin.example.com']
})

// Dynamic origin
new CorsMiddleware({
	origin: (origin, c) => {
		return origin.endsWith('.example.com') ? origin : 'https://example.com'
	}
})
```

**Options:**

- `origin` (string|string[]|function): Allowed origins (default: "\*")
- `allowMethods` (string[]|function): Allowed HTTP methods
- `allowHeaders` (string[]): Allowed headers
- `exposeHeaders` (string[]): Exposed headers
- `maxAge` (number): Preflight cache duration
- `credentials` (boolean): Allow credentials

#### CsrfMiddleware

Cross-Site Request Forgery protection middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/csrf-protection)**

```typescript
import { CsrfMiddleware } from '@honestjs/middleware'

// Basic CSRF protection
new CsrfMiddleware()

// Custom CSRF configuration
new CsrfMiddleware({
	origin: 'https://example.com',
	token: 'custom-csrf-token'
})
```

#### SecureHeadersMiddleware

Security headers middleware for enhanced security.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/secure-headers)**

```typescript
import { SecureHeadersMiddleware } from '@honestjs/middleware'

// Default security headers
new SecureHeadersMiddleware()

// Custom security configuration
new SecureHeadersMiddleware({
	xFrameOptions: 'DENY',
	xXssProtection: false,
	strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
	contentSecurityPolicy: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'", "'unsafe-inline'"],
		styleSrc: ["'self'", "'unsafe-inline'"],
		imgSrc: ["'self'", 'data:', 'https:']
	},
	permissionsPolicy: {
		camera: false,
		microphone: ['self'],
		geolocation: ['self', 'https://maps.example.com']
	}
})
```

**Security Headers Options:**

- `xFrameOptions` (string|boolean): X-Frame-Options header
- `xXssProtection` (string|boolean): X-XSS-Protection header
- `strictTransportSecurity` (string|boolean): HSTS header
- `contentSecurityPolicy` (object): CSP configuration
- `permissionsPolicy` (object): Permissions Policy configuration
- `crossOriginResourcePolicy` (string|boolean): CORP header
- `crossOriginOpenerPolicy` (string|boolean): COOP header
- `crossOriginEmbedderPolicy` (string|boolean): COEP header
- `referrerPolicy` (string|boolean): Referrer Policy header

### Request Processing Middleware

#### BodyLimitMiddleware

Request body size limiting middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/body-limit)**

```typescript
import { BodyLimitMiddleware } from '@honestjs/middleware'

// 1MB limit
new BodyLimitMiddleware({ maxSize: 1024 * 1024 })

// 10MB limit with custom error
new BodyLimitMiddleware({
	maxSize: 10 * 1024 * 1024,
	onError: (c) => c.text('Request too large', 413)
})
```

**Options:**

- `maxSize` (number): Maximum request body size in bytes
- `onError` (function): Custom error handler

#### CompressionMiddleware

Response compression middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/compress)**

```typescript
import { CompressionMiddleware } from '@honestjs/middleware'

// Default compression
new CompressionMiddleware()

// Custom compression options
new CompressionMiddleware({
	encoding: 'gzip', // 'gzip', 'deflate', 'br'
	threshold: 1024 // Minimum size to compress
})
```

#### TimeoutMiddleware

Request timeout middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/timeout)**

```typescript
import { TimeoutMiddleware } from '@honestjs/middleware'

// 30 second timeout
new TimeoutMiddleware(30000)

// 5 second timeout with custom error
new TimeoutMiddleware(5000, () => new Response('Request timeout', { status: 408 }))
```

**Options:**

- `duration` (number): Timeout duration in milliseconds
- `onTimeout` (function): Custom timeout handler

#### IpRestrictionMiddleware

IP address restriction middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/ip-restriction)**

```typescript
import { IpRestrictionMiddleware } from '@honestjs/middleware'

// Allow specific IPs
new IpRestrictionMiddleware({
	allow: ['192.168.1.0/24', '10.0.0.1']
})

// Block specific IPs
new IpRestrictionMiddleware({
	deny: ['192.168.1.100', '10.0.0.50']
})
```

**Options:**

- `allow` (string[]): Allowed IP addresses/ranges
- `deny` (string[]): Denied IP addresses/ranges

### Response Enhancement Middleware

#### CacheMiddleware

HTTP caching middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/cache)**

```typescript
import { CacheMiddleware } from '@honestjs/middleware'

// Cache for 1 hour
new CacheMiddleware({
	cacheName: 'api-cache',
	cacheControl: 'max-age=3600'
})

// Conditional caching
new CacheMiddleware({
	cacheName: 'dynamic-cache',
	cacheControl: 'public, max-age=300',
	vary: ['Accept-Encoding', 'User-Agent']
})
```

#### RequestIdMiddleware

Request ID generation middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/request-id)**

```typescript
import { RequestIdMiddleware } from '@honestjs/middleware'

// Default request ID
new RequestIdMiddleware()

// Custom request ID configuration
new RequestIdMiddleware({
	generator: () => `req-${Date.now()}-${Math.random()}`,
	headerName: 'x-request-id'
})
```

### Utility Middleware

#### LoggerMiddleware

HTTP request logging middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/logger)**

```typescript
import { LoggerMiddleware } from '@honestjs/middleware'

// Default logging
new LoggerMiddleware()

// Custom log format
new LoggerMiddleware((str, ...rest) => {
	console.log(`[${new Date().toISOString()}] ${str}`, ...rest)
})
```

#### LanguageDetectorMiddleware

Language detection middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/language)**

```typescript
import { LanguageDetectorMiddleware } from '@honestjs/middleware'

// Default language detection
new LanguageDetectorMiddleware()

// Custom language configuration
new LanguageDetectorMiddleware({
	supportedLanguages: ['en', 'es', 'fr'],
	defaultLanguage: 'en'
})
```

#### TrailingSlashMiddleware

URL trailing slash handling middleware.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/trailing-slash)**

```typescript
import { TrimTrailingSlashMiddleware, AppendTrailingSlashMiddleware } from '@honestjs/middleware'

// Remove trailing slashes
new TrimTrailingSlashMiddleware()

// Add trailing slashes
new AppendTrailingSlashMiddleware()
```

### Rendering Middleware

#### JsxRendererMiddleware

JSX rendering middleware with layout support.

**📚 [Official Hono Documentation](https://hono.dev/docs/middleware/builtin/jsx-renderer)**

```typescript
import { JsxRendererMiddleware } from '@honestjs/middleware'

// Extend context renderer types
declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response
  }
}

// Basic layout
const Layout = ({ children, title }: { children: any; title?: string }) => (
  <html>
    <head>
      <title>{title || 'My App'}</title>
    </head>
    <body>{children}</body>
  </html>
)

new JsxRendererMiddleware(Layout)

// Advanced JSX renderer
new JsxRendererMiddleware(
  ({ children, title }) => (
    <html>
      <head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  ),
  {
    docType: true, // Add DOCTYPE html
    stream: true   // Enable streaming
  }
)

// Usage in route
app.get('/page', (c) => {
  return c.render(<h1>Hello World</h1>, { title: 'Home Page' })
})
```

**Options:**

- `docType` (boolean|string): Add DOCTYPE to HTML
- `stream` (boolean|object): Enable streaming response

#### EmojiFavicon

Custom emoji favicon middleware.

```typescript
import { EmojiFavicon } from '@honestjs/middleware'

// Flame emoji favicon
new EmojiFavicon('🔥')

// Any emoji
new EmojiFavicon('🚀')
```

### Generic Middleware Wrapper

#### HonoMiddleware

Wrap any Hono middleware for use with HonestJS.

```typescript
import { HonoMiddleware } from '@honestjs/middleware'
import { poweredBy } from 'hono/powered-by'
import { prettyJSON } from 'hono/pretty-json'

// Wrap third-party middleware
new HonoMiddleware(poweredBy())
new HonoMiddleware(prettyJSON())

// Wrap custom middleware
new HonoMiddleware(async (c, next) => {
	c.header('X-Custom-Header', 'Custom Value')
	await next()
})
```

## Advanced Usage Examples

### Complete Application Setup

```typescript
import { Application, Module } from 'honestjs'
import {
  LoggerMiddleware,
  CorsMiddleware,
  SecureHeadersMiddleware,
  JwtMiddleware,
  CompressionMiddleware,
  RequestIdMiddleware,
  JsxRendererMiddleware,
  EmojiFavicon
} from '@honestjs/middleware'

// Main layout component
const MainLayout = ({ children, title }: { children: any; title?: string }) => (
  <html>
    <head>
      <title>{title || 'My App'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <header>
        <h1>My Application</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </body>
  </html>
)

@Module({
  // Module configuration
})
export class AppModule {}

const { hono } = await Application.create(AppModule, {
  hono: { strict: true },
  routing: { prefix: 'api', version: 1 },
  components: {
    middleware: [
      new LoggerMiddleware(),
      new EmojiFavicon('🔥'),
      new RequestIdMiddleware(),
      new CompressionMiddleware(),
      new SecureHeadersMiddleware({
        contentSecurityPolicy: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"]
        }
      }),
      new CorsMiddleware({
        origin: ['https://app.example.com', 'https://admin.example.com'],
        credentials: true
      }),
      new JwtMiddleware({
        secret: process.env.JWT_SECRET!,
        alg: 'HS256'
      }),
      new JsxRendererMiddleware(MainLayout, {
        docType: true
      })
    ]
  }
})

// Add route handlers
hono.get('/', (c) => {
  return c.render(<h1>Welcome to My App</h1>, { title: 'Home' })
})

hono.get('/about', (c) => {
  return c.render(
    <div>
      <h1>About Us</h1>
      <p>This is a sample application built with HonestJS and Hono middleware.</p>
    </div>,
    { title: 'About' }
  )
})
```

### Environment-Specific Configuration

```typescript
const isDevelopment = process.env.NODE_ENV === 'development'
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000'

const { hono } = await Application.create(AppModule, {
	components: {
		middleware: [
			new LoggerMiddleware(),
			new CorsMiddleware({
				origin: isDevelopment ? '*' : corsOrigin,
				credentials: !isDevelopment
			}),
			new SecureHeadersMiddleware({
				strictTransportSecurity: isDevelopment ? false : 'max-age=31536000; includeSubDomains; preload'
			})
		]
	}
})
```

### Conditional Middleware

```typescript
// Apply authentication only to API routes
hono.use('/api/*', new JwtMiddleware({ secret: 'your-secret' }).use)

// Apply CORS only to public routes
hono.use('/public/*', new CorsMiddleware({ origin: '*' }).use)

// Apply rate limiting to sensitive endpoints
hono.use(
	'/auth/*',
	new IpRestrictionMiddleware({
		allow: ['192.168.1.0/24']
	}).use
)
```

## TypeScript Support

All middleware are fully typed with TypeScript. You can extend the Hono context types for better type safety:

```typescript
declare module 'hono' {
	interface Variables {
		user: User
		requestId: string
	}

	interface ContextRenderer {
		(content: string | Promise<string>, props: SiteData): Response
	}
}

interface SiteData {
	title: string
	description?: string
	keywords?: string[]
}
```

## License

MIT © [Orkhan Karimov](https://github.com/kerimovok)
