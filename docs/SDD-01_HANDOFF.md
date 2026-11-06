# [SDD-01] Handoff — Project Setup & Architecture

- Status: **Scaffold prepared — pending user verification**
- Repository: `sdd-commerce`
- Implementation: React/Vite/MUI frontend; Express backend; `/api/health`; Vite proxy; root scripts; Node test; docs from SDD-00.
- Run: `npm install`; `npm install --prefix backend`; `npm install --prefix frontend`; `Copy-Item backend/.env.example backend/.env`; `npm run dev`.
- Verify: `npm test`, `npm run build`, browser `http://localhost:5173`, API `http://localhost:5000/api/health`.
- Expected: API `{ "status":"ok", "service":"sdd-commerce-api" }`; frontend displays API status.
- Known limitations: Dependencies not installed in the downloaded scaffold; user must run and verify on Windows; MongoDB, login and product API deferred.
- Next: [SDD-02] Frontend Development; build page layout, product mock data and navigation.
- Update this document and `PROGRESS.md` after tests pass; commit only after verifying.
