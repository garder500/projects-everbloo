---
description: "Use when editing Nuxt 3 frontend code in front-dashboard or front-reservation: component layout, Pinia stores, composables, proxy config, environment files, and Vuetify integration."
applyTo: "front-*/src/**"
---

# Nuxt Frontend Conventions

## Runtime
- SSR is **disabled** (`ssr: false`) — all code runs client-side only.
- Environment files live in `src/.environments/` (plural **s**).
- Proxy config in `nuxt.config.ts` routes API calls to backends — never hardcode backend URLs in components.

## Pinia Stores
- Use `defineStore` with explicit `state`, `getters`, `actions` (options API style).
- Persist auth state to `sessionStorage` via `@pinia-plugin-persistedstate/nuxt`.
- Naming: `use<Domain>Store` exported from `stores/<domain>.ts`.
- Booking/servicing flows use dedicated `*FlowStore.ts` or `*ServicingFlow.ts` files.

## Composables
- File naming: `use<Feature>.ts` in `composables/`.
- Two patterns in use:
  - **Provide/Inject**: `InjectionKey` + `provide`/`inject` for complex parent-child state sharing.
  - **Reactive API**: `ref`/`computed` wrapping API calls for self-contained data fetching.

## Components
- Organize by domain folder (`booking/`, `sbt/`, `profile/`).
- Shared utilities go in `shared/`, `s-components/`, or `style-components/`.
- Vuetify 3 components are available globally — do not re-import them.

## Plugins
- Client-only plugins use the `.client.ts` suffix or `{ mode: 'client' }` in `nuxt.config.ts`.
- Toast notifications use the shared `toast` store pattern (both frontends).
