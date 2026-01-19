## Getting Started

This is a Nike E-commerce product page powered by Next.js 16, TypeScript, TailwindCSS, and Better Auth. The backend runs on Neon PostgreSQL with Drizzle ORM, with Zustand handling state management.

It features a dashboard landing page, a products listing page, a page for every individual product details, in which we can search, sort and filter through Nike's current catalogue.

## Tech Stack Explained
- TypeScript for type-safety coding.
- Tailwind CSS for efficient CSS styling.
- Neon PostgreSQL that supports assets compliance so that it provides the structured data with transaction safely and allows us to write queries which are ideal for filtering, sorting and checkout.
- Drizzle ORM, since we're using TypeScript - a schema-first-approach to enhance type-safety at compile time to prevent users from making some invalid queries.
- Better Auth for authentication. It supports emails, O-Auth, magic links and so on, without locking us into a hosted solution. It also has a built-in rate-limiting feature (protection against brute force attacks!).
- Zustand for global state management. It's a simpler hook-based solution which I prefer more than Redux ( requires some huge boilerplate ).


## Deploy on Vercel



Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
