## Tushar Sachan — Developer Portfolio

Modern, fast, and content‑focused portfolio built with Next.js 14 (App Router), Tailwind CSS, and a minimal UI system. It includes a contextual AI assistant, email contact form, projects, timeline, and theming.

### Features

- Dark/light theme with system preference
- Projects and experience fed from JSON data
- MDX support for content
- Responsive, accessible UI using Radix primitives
- AI chat assistant grounded in site content (RAG)
- Email contact form powered by Resend

### Tech Stack

- Next.js 14 (App Router), React 18
- TypeScript, Zod, React Hook Form
- Tailwind CSS, Framer Motion, Radix UI
- LangChain, OpenAI embeddings, Astra DB Vector Store
- Upstash Redis (caching), Resend (email)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Accounts/keys for: OpenAI, DataStax Astra DB, Upstash Redis, Resend

### Installation

```bash
git clone <your-repo-url> portfolio
cd portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with:

```bash
# OpenAI (for embeddings and chat models)
OPENAI_API_KEY=your_openai_api_key

# DataStax Astra DB (for vector store)
ASTRA_DB_API_ENDPOINT=your_astra_db_endpoint
ASTRA_DB_APPLICATION_TOKEN=your_astra_db_token
ASTRA_DB_COLLECTION=your_collection_name

# Upstash Redis (used by LangChain cache)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Resend (email)
RESEND_API_KEY=your_resend_api_key
```

Notes:

- The vector store expects 1536‑dimensional embeddings (`text-embedding-3-small`).
- Redis is optional but recommended for caching chat responses.

## Scripts

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run gen      # Run content generation script (scripts/generate.ts) if used
npm run build    # Generate site + type check
npm run start    # Start production server
npm run lint     # Lint with Next.js ESLint config
npm run format   # Prettier format
```

## Project Structure

```
src/
  app/                # App Router pages (routes, API, layout)
  components/         # UI and feature components
  contexts/           # React contexts (e.g., chat)
  data/               # JSON content for projects/education/career/socials
  lib/                # Core libs (actions, schemas, utils, posts, vectordb)
public/               # Static assets (icons, images, resume)
scripts/              # Utility scripts (e.g., generate.ts)
```

Key endpoints and modules:

- `src/app/api/chat/route.ts`: Streaming chat endpoint using LangChain retrieval.
- `src/lib/vectordb.ts`: Astra DB vector store + OpenAI embeddings.
- `src/lib/actions.ts`: Server action to send email via Resend.

## Development Tips

- Update `src/data/*.json` to change projects, education, career, and socials.
- Adjust image domains in `next.config.mjs` if you serve remote images.
- The chat persona and guardrails are defined in `api/chat/route.ts`.

## Deployment

This project works great on Vercel.

1. Set the same environment variables in your hosting provider.
2. Build command: `npm run build`
3. Start command: `npm run start` (Vercel uses its own adapter by default for Next.js).

## License

MIT — see `LICENSE.txt`.
