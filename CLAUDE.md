# Project Instructions

## Git Commits
- Do NOT add `Co-Authored-By` trailers to any git commit messages

## Project Context

922-Studio is the public landing page and creative portfolio at studio.922-studio.com. It is a fully public Next.js 16 site with no authentication. Supported locales are `en` (default) and `de` via next-intl. Content is managed as MDX files in `content/` with gray-matter frontmatter. The site is deployed as a Docker container on the `proxy` network, routed by Traefik.

## Key Files to Read

| File | When to read |
|------|-------------|
| `package.json` | Before touching dependencies or scripts |
| `next.config.ts` | Before touching build, MDX, or i18n config |
| `src/i18n/routing.ts` | Before touching locale config or adding a new locale |
| `src/app/[locale]/layout.tsx` | Before touching layout, fonts, metadata, or GA4 |
| `src/app/[locale]/page.tsx` | Before touching the home page |
| `messages/en.json` + `messages/de.json` | Before touching any copy — keep both in sync |
| `content/` | Before touching MDX content or frontmatter schema |
| `src/components/` | Before adding or modifying shared components |
| `Dockerfile` | Before touching the build pipeline |
| `docker-compose.yaml` | Before touching deployment or Traefik config |
| `deploy.sh` | Before touching deployment logic |
| `.github/workflows/deploy.yml` | Before touching the CI/CD pipeline |

## Commands

```bash
npm run dev           # Start development server (localhost:3000)
npm run build         # Production build
npm start             # Run production server

npm run lint          # ESLint

npm run test:unit     # Vitest — watch mode
npm run test:unit:ci  # Vitest — single run (CI)
npm run test:coverage # Vitest — with coverage report
npm run test          # Playwright E2E tests
npm run test:install  # Install Playwright browsers
```

## Conventions

- **TypeScript**: strict mode, `@/*` path aliases for `src/`
- **Styling**: Tailwind CSS 4 utility classes — no custom CSS unless absolutely necessary
- **i18n**: always update both `messages/en.json` and `messages/de.json` when changing copy
- **Routing**: all routes live under `src/app/[locale]/` — never add routes outside the locale segment
- **Content**: MDX files in `content/<section>/` with YAML frontmatter; reading-time is calculated at build time
- **SSG**: use `generateStaticParams` for all locale routes
- **Components**: co-locate test files (`*.test.tsx`) next to the component file
- **Testing**: Allure project IDs are `studio-unit` (unit) and `studio-e2e` (E2E)
- **No forward-auth**: this is a public site — do not add auth middleware to Traefik labels
