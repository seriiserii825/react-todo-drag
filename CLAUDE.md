# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A React + TypeScript + Vite todo app (early stage — name implies drag-and-drop reordering is planned but not yet implemented). Uses `bun` as the package manager (see `bun.lock`).

## Commands

- `bun install` — install dependencies
- `bun run dev` — start Vite dev server with HMR
- `bun run build` — type-check (`tsc -b`) then build via Vite
- `bun run lint` — run ESLint over the project
- `bun run preview` — preview the production build

There is no test setup in this project currently.

## Architecture

- `src/main.tsx` — entry point, mounts `App` into `#root` inside `StrictMode`.
- `src/App.tsx` — root component; owns top-level state (`todo` input value, `todos` list) and passes handlers down as props (no context/state library — plain prop drilling).
- `src/models.ts` — shared TypeScript types (e.g. `Todo`).
- `src/components/` — presentational components, each typically paired with its own `*.css` file imported directly in the component (e.g. `InputField.tsx` + `styles.css`).

State is currently centralized in `App.tsx` and passed down via props; as components are added, follow this same pattern unless the user asks to introduce a state management library.

## TypeScript / lint conventions

- TS config uses `verbatimModuleSyntax`, so type-only imports must use `import type { ... }`.
- `noUnusedLocals` and `noUnusedParameters` are enforced — unused code will fail the build, not just lint.
- ESLint config (`eslint.config.js`) is flat-config based with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` (Vite-aware).
