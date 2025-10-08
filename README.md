# self-hosted next-15 with redis cache (no CDN for pages)

This project demos latest next application with redis caching-layer.

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



See https://nextjs.org/docs/app/guides/self-hosting