---
name: i18n-locale
description: Explains how locale resolution works in this project and the rules for using next-intl navigation wrappers
---

## How locale resolution works in this project

This project uses **next-intl** with `localePrefix: "always"`, meaning every URL has an explicit locale prefix (e.g. `/pl/recipes`). Currently the only supported locale is `pl`.

### Middleware (`middleware.ts`)

`createMiddleware(routing)` runs on every non-API, non-static request. It:
- Redirects un-prefixed paths to the default locale (`/recipes` → `/pl/recipes`)
- Passes `/api/auth/*` routes through untouched (NextAuth needs this)

### `[locale]` segment

All pages live under `src/app/[locale]/`. The `[locale]` segment is populated by the middleware redirect, so every page always has a valid locale in its params.

### `src/i18n/request.ts`

Resolves the locale for server components and loads the split message files:
- `messages/pl/general.json`
- `messages/pl/navigation.json`
- `messages/pl/landing.json`
- `messages/pl/recipes.json`
- `messages/pl/auth.json`

These are merged under their filename as the namespace key, e.g. `t("navigation.signIn")`.

### `src/i18n/navigation.ts`

Exports locale-aware wrappers around Next.js navigation primitives:
```ts
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

---

## Rule: always use the next-intl navigation wrappers

**Never import `Link`, `redirect`, `useRouter`, or `usePathname` from `next/link` or `next/navigation` directly in this project.**

Always import from `@/i18n/navigation` instead:

```ts
// ✅ correct
import { Link, redirect, useRouter, usePathname } from "@/i18n/navigation";

// ❌ wrong — bypasses locale injection
import Link from "next/link";
import { redirect, useRouter, usePathname } from "next/navigation";
```

The wrappers automatically inject the current locale into every href, so you never need to manually prefix paths with `/pl`.

The `LinkButton` component (`src/components/generic/LinkButton.tsx`) already uses the next-intl `Link` — prefer it over raw `<Link>` for button-style navigation.
