# Nuxt Boilerplate

A production-ready Nuxt 4 boilerplate with feature-based architecture, strict TypeScript, multi-theme support, i18n, and a full testing pipeline.

## Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 (`srcDir: app/`, `serverDir: server/`) |
| Language | TypeScript (strict mode) |
| State | Pinia + Pinia ORM + pinia-plugin-persistedstate |
| Async state | @pinia/colada |
| Styling | SCSS + CSS custom properties (design tokens) |
| i18n | @nuxtjs/i18n with auto-loading glob plugin |
| Icons | @nuxt/icon (Phosphor, Fluent, Flag collections) |
| SEO | @nuxtjs/seo (sitemap, OG, robots) |
| Linting | ESLint + oxlint + Prettier |
| Testing | Vitest (unit + Nuxt integration) + Playwright (e2e) |
| Git hooks | Husky + commitlint (Conventional Commits) |

## Architecture

Feature-based — every domain concept lives in its own folder:

```
app/
├── features/
│   └── <name>/
│       ├── components/    # feature-local Vue components
│       ├── composables/   # useFeature.ts – business logic
│       ├── stores/        # useFeatureStore.ts – Pinia store
│       ├── models/        # Pinia ORM models
│       ├── types/         # feature.types.ts
│       └── locales/       # en.json
├── components/shared/     # App-prefixed shared components (AppButton, AppModal…)
├── composables/           # Global composables (useApi, useToast)
├── layouts/               # default.vue, auth.vue
├── pages/                 # Thin pages – delegate to feature components
├── plugins/               # i18n-locales, theme.client
├── stores/                # Cross-feature global stores
├── types/                 # Global TypeScript types
└── assets/scss/           # Design tokens, reset, theme files
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm check` | Typecheck + lint + format check |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm format` | Prettier write |
| `pnpm test` | All tests (unit + Nuxt integration) |
| `pnpm test:coverage` | Tests with V8 coverage report |
| `pnpm test:unit` | Unit tests only |
| `pnpm test:nuxt` | Nuxt integration tests only |
| `pnpm test:e2e` | Playwright e2e tests |

## Theme System

Three built-in themes: `default` (indigo light), `dark`, `ocean` (teal).

- Theme tokens live in `app/assets/scss/themes/`
- Each theme uses `[data-theme='<name>']` with HSL component variables
- Theme persists to `localStorage` and is applied via a blocking inline script before first render (no flash)
- Users can override the primary color at runtime via `useTheme().setCustomColor(hex)`

**Adding a new theme:**
1. Create `app/assets/scss/themes/_<name>.scss`
2. Add the id to `ThemeId` in `app/features/theme/types/theme.types.ts`
3. Add the option to `THEME_OPTIONS` in `useTheme.ts`
4. Import the file in `app/assets/scss/main.scss`

## Adding a New Feature

1. `app/features/<name>/types/<name>.types.ts`
2. `app/features/<name>/locales/en.json`
3. `app/features/<name>/stores/use<Name>Store.ts`
4. `app/features/<name>/composables/use<Name>.ts`
5. `app/features/<name>/components/`
6. `app/pages/<name>.vue` (thin wrapper)
7. `test/nuxt/<name>.test.ts`

## Conventions

- **No comments** — code is self-documenting through naming
- **No `any`** — explicit types everywhere
- **`@/` alias** for all internal imports (not `~/`)
- **Auto-imports** — do not manually import Vue reactivity, Nuxt composables, or Pinia `defineStore`
- **i18n** — all user-facing strings use `$t()` or `t()`; locale files auto-loaded by `i18n-locales` plugin
- **Commits** — Conventional Commits enforced by commitlint (`feat`, `fix`, `chore`, `refactor`, …)
