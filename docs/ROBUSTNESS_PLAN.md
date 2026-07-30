# onesaz-ui — Path to Robust

Status: in progress · Owner: design-system team

## Definition of "robust" (acceptance criteria)
The library is robust when **all** of these hold:
1. **Can't break silently** — every shipped component has tests; CI blocks a regressing PR.
2. **Low hand-rolling** — a real screen is ~90% components / ~10% `className` (today ~50/50).
3. **One source of truth** — tokens, docs, and code cannot drift.
4. **Consistent, generated docs** — one prop vocabulary; API reference generated from types.
5. **Adoptable** — semver + changelog; consumers upgrade without fear.

Today: strong on layout/theming/display; **zero** on #1. This plan closes the rest.

---

## Phase 0 — Make change safe (the unlock)
*Nothing else is durable without this.*
- [x] Test tooling: Vitest + @testing-library/react + jsdom + jest-axe in `packages/ui`.
- [x] `test` / `test:watch` scripts; `vitest.config.ts` + `src/test/setup.ts`.
- [x] First test batch — everything we changed/added this session (**30 tests, green**):
  - [x] `Stat` (label/value/delta/trend/sentiment color)
  - [x] `Container` (maxWidth classes)
  - [x] `Box` (grow/shrink/minH/minW/inset/z/per-side padding/numeric width)
  - [x] `Stack` (gap/justifyContent/alignItems aliases, p/px/py, flexWrap alias, grow)
  - [x] `Table` cell `align`, `CardTitle` `size`
  - [x] `Button`/`IconButton` icon-size constraint (`[&_svg]`)
  - [x] `Grid` ergonomic API (auto-container, responsive `columns`, `gap` alias)
  - [x] `EmptyState`/`ErrorState`
  - [x] a11y smoke (jest-axe) on Button, Card, Table, Stat, EmptyState
- [ ] Broaden coverage to remaining core components (Badge, Checkbox, Sidebar a11y, Tabs…).
- [ ] Minimal CI: build + typecheck + test on PR *(paused per owner — enable when ready)*.
- [ ] Fix `.git` object ownership so the branch can commit (`sudo chown -R $USER .git`).
- [ ] Fix `~/.npm` cache + `package-lock.json` ownership (`sudo chown -R $USER ~/.npm`); installed via `--no-package-lock` for now.

**Done when:** `npm run test` is green and fails if any of the above components regress. ✅ (for this batch)

## Phase 1 — Close the mid-level component gaps
*Drops hand-rolling from ~50% → ~10%. Each ships with tests (Phase 0 net).*
- [x] `ToggleGroup` / Segmented (value + onValueChange) — List/Board, time-range, Buy/Sell
- [x] `Typography` `mono` / `tabularNums`
- [x] `StatusDot` / indicator (+ pulse, label)
- [x] `Stepper` (multi-step flows)
- [x] `SelectField` (Select + label/helper, structural parity with TextField)
- [x] `Drawer` — already exists (`drawer.tsx`, `side="right"`); no new build needed
- [x] `NavItem` (icon + label + active + trailing slot; real button / anchor)
- [x] `ChipInput` (recipient/token field; Enter/comma add, Backspace/× remove)
- [x] `DataGrid` easier: `cellClassName` now accepts `(params) => string` for conditional cell styling (no `renderCell` needed for colour-by-value).

**Shipped Phase 1:** 8 improvements (7 new components + `Typography` mono/tabular + `DataGrid` conditional cells), all exported, tsc + build clean, **51 tests green**.

### Adoption proof (real hand-rolling removed)
- **Checkout** → uses `<Stepper>` + `<SelectField>` (deleted ~55 lines of hand-styled step circles + field wrapper). Verified.
- **Issue Tracker** → uses `<ToggleGroup>` (List/Board) + `<NavItem>` (sidebar). Verified.

## Phase 2 — Kill drift
- [x] Generate token CSS from `tokens/*.ts` — `packages/tokens/scripts/generate-css.mjs`
      (`npm run generate:css`) emits `tailwind-config/src/tokens.generated.css`.
- [x] **Drift guard in the test net** (`token-drift.test.ts`, 5 tests): v4.css + globals.css
      `--accent`/`--accent-hover`/semantic-500 must equal the TS tokens, and every generated
      semantic token must appear in v4.css. The accent-bug class of drift now fails `npm test`.
- [x] Generate the component-API reference from types — `packages/ui/scripts/generate-api-docs.mjs`
      (`npm run generate:api`, via react-docgen-typescript) emits `docs/COMPONENT-API.md`
      (198 components, real props/types/defaults/JSDoc). Props source of truth is now generated,
      so "docs describe a different API than the code ships" is structurally solved.
      *(CI should run it and fail on git diff to catch staleness — enable with CI.)*

**Shipped Phase 2:** token-CSS generator + 5-test drift guard **and** types→API-docs generator.
Single source of truth for both tokens and prop docs. **56 tests green.**

## Phase 3 — Adoptable
- [ ] Changesets + CHANGELOG + semver.
- [ ] a11y audit of non-Radix components; keyboard coverage.
- [ ] README with install + theming + usage.

---

## Progress log
- 2026-07-30 — Plan created. Starting Phase 0 (test + CI net).
