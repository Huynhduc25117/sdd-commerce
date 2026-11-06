# SDD Commerce — Progress

## Status
- Current: SDD-02 — Frontend Development
- State: Customer/admin demo UI implemented and smoke-tested; authentication and data are not server-backed.
- Next: SDD-03 — Backend & REST API

## Completed
- [x] Define product goal and MVP boundary
- [x] Define target stack and architecture
- [x] Define initial API/data model
- [x] Define module handoff mechanism
- [x] SDD-01 scaffold: React/Vite/MUI, Express health endpoint and Vite proxy
- [x] SDD-02 frontend demo: customer browsing/cart/checkout/account and admin UI
- [ ] Confirm original names of modules SDD-04 through SDD-14
- [ ] Complete backend/database/authentication and replace browser-only demo data

## Decisions
- D-001: Single product/repository named `sdd-commerce`.
- D-002: React + Vite + MUI; Node.js + Express + MongoDB.
- D-003: Start with simulated COD checkout; no live payments in MVP.
- D-004: Ubuntu VPS + Docker Compose + Nginx + GitHub Actions target.
- D-005: Practice-first 80/20; explicit module completion gate.

## Known risks / open questions
- Exact titles for SDD-04 through SDD-14 have not been recovered; current names are provisional.
- Domain/VPS provider and credentials are not yet selected; no secrets should be shared in chat or committed.

## Next actions (SDD-01)
1. Initialize repository and root README.
2. Scaffold Vite React frontend and Express backend.
3. Add .gitignore, .env.example, scripts and health endpoint.
4. Run both locally and capture commands and output.
5. Commit baseline and update this file.

## Last handoff
- Source module: SDD-00
- Deliverables: docs/PROJECT_MASTER.md, docs/PROGRESS.md, docs/HANDOFF_TEMPLATE.md
- Ready for: SDD-01

## SDD-01 scaffold (2026-11-06)
- Scaffold generated: frontend React/Vite/MUI, backend Express, health endpoint and test.
- Verification: `npm test` passed (1 test); `npm run build` passed.
- Next: SDD-02 frontend development.

## SDD-02 frontend (2026-11-06)
- Added responsive customer storefront, product search/filter/sort/detail, cart, COD checkout, order history, demo account and admin dashboard.
- Browser `localStorage` is used only as a frontend demonstration adapter; no product/order/auth/admin endpoint exists yet.
- Verification: production build and backend health test passed; browser smoke tests covered filtering, empty states, cart persistence/quantity/removal, COD order, account form, admin demo CRUD/status and 404/mobile navigation.
- Remaining: real admin authorization, MongoDB/API integration, server-authoritative stock/pricing/order totals, automated frontend/E2E tests, and all later DevOps phases.
