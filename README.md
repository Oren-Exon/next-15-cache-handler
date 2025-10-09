# self-hosted next-15 with redis cache (no CDN for pages)

This project demos latest next application with redis caching-layer.

More info:
- https://nextjs.org/docs/app/guides/self-hosting
- https://github.com/fortedigital/nextjs-cache-handler

## Requirements

- nodejs v18 or higher
- docker (only required for `npm start` command)

## Available scripts

- `npm run dev` - Start development server with mock API
- `npm run build` - Build the application for production
- `npm run start` - Build and Start production server using Docker Compose
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript type checking
- `npm run api-mocks` - Start mock API server

## Available Routes

### Pages
- `/` - Home page with Next.js welcome content
- `/count/[keyword]` - Dynamic route that fetches count data for a given keyword (revalidates every 500 seconds)
- `/lpvs/[lpv]/verticals/best/search/[keyword]` - Nested dynamic route for search functionality (revalidates every 120 seconds)
  - Note: Only works when `lpv` parameter equals "10000"

### API Routes
- `POST /api/revalidate?path=<path>` - Revalidates a specific path in the cache

## Rewrite Routes

This application uses two types of URL rewrites to provide clean, SEO-friendly URLs while maintaining the underlying route structure:

### Next.js Config Rewrites
Configured in `next.config.ts`:

- `/foo/:path*` → `/lpvs/10000/verticals/best/search/:path*`
  - Example: `/foo/tv` → `/lpvs/10000/verticals/best/search/tv`
  - This rewrite works well with caching (uses the internal route cache)

### Middleware Rewrites
Configured in `middleware.ts`:

- `/search/:path*` → `/lpvs/10000/verticals/best/search/:path*`
  - Example: `/search/tv` → `/lpvs/10000/verticals/best/search/tv`
  - This rewrite **DOES NOT** work well with caching (skips caching entirely)

### Testing Rewrites

You can test the rewrite functionality by visiting:
- `http://localhost:3000/search/tv` (middleware rewrite) - cache does not work (seems that it skips caching entirely - no `x-nextjs-cache` header)
- `http://localhost:3000/foo/tv` (config rewrite) - cache does work (the cache is on the internal page route as expected)
