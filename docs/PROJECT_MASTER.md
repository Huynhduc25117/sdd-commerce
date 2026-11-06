# SDD Commerce — Project Master Plan

- Project ID: SDD
- Repository: `sdd-commerce`
- Current module: `[SDD-00] Project Master Plan`
- Goal: Deliver a public HTTPS e-commerce MVP on an Ubuntu VPS with CI/CD.
- Principle: One repository, one product, 15 sequential modules, practice-first 80/20.

## 1. MVP acceptance criteria
- Customer can register, log in, browse/search products, manage a cart, place a simulated COD order, and see order history/status.
- Admin can log in, manage products, and update order statuses.
- Public website is reachable via a domain and HTTPS.
- Automated checks run on pull requests; deployment is reproducible; secrets are not committed.

## 2. Fixed stack
- Frontend: React, Vite, MUI, JavaScript
- Backend: Node.js, Express, Mongoose, JavaScript
- Database: MongoDB
- Auth: JWT, bcrypt
- Tooling: Git, GitHub, VS Code, Docker, Docker Compose
- Production: Ubuntu VPS, Nginx, Let's Encrypt, GitHub Actions

## 3. Architecture
Browser -> HTTPS / Nginx -> React static assets and /api -> Express API -> MongoDB.
Production: Docker Compose orchestrates services; database not publicly exposed.
Development: frontend and backend may run separately; use env variables for configuration.

## 4. Scope
### In scope (MVP)
- User registration/login/logout and role-based authorization
- Product list/detail/search
- Cart quantity updates and removal
- Checkout with simulated cash on delivery
- Order history/status
- Admin product CRUD and order management
- Basic validation, error handling, logging, automated tests

### Out of scope until after MVP
- Live payment processing, coupons, ratings/reviews, complex inventory, analytics, multi-vendor, native mobile app

## 5. Initial data model
- User: name, email (unique), passwordHash, role, createdAt
- Product: name, slug, description, price, stock, imageUrl, active, createdAt
- Order: userId, items[{productId, nameSnapshot, unitPrice, quantity}], total, shippingAddress, paymentMethod, status, createdAt
- Cart: initially client-side persistence, reconciled with server-side product prices and stock at checkout
- Monetary amounts stored as integer VND; never trust client-submitted prices.

## 6. API contract (initial)
- POST /api/auth/register; POST /api/auth/login; GET /api/auth/me
- GET /api/products; GET /api/products/:id
- POST /api/orders; GET /api/orders; GET /api/orders/:id
- POST /api/admin/products; PATCH /api/admin/products/:id; DELETE /api/admin/products/:id
- GET /api/admin/orders; PATCH /api/admin/orders/:id/status
- GET /api/health

## 7. Repository layout
```text
sdd-commerce/
  frontend/
  backend/
  docs/
    PROJECT_MASTER.md
    PROGRESS.md
    HANDOFF_TEMPLATE.md
  .github/workflows/
  compose.yaml
  .env.example
  README.md
```
Files/folders are target structure and may be created incrementally.

## 8. Modules
The first four titles were explicitly recovered from the agreed plan. Titles for SDD-04 through SDD-14 below are PROVISIONAL working labels pending confirmation against the original 15-module list.

| Module | Title | Exit artifact |
|---|---|---|
| SDD-00 | Project Master Plan | Master plan + progress + handoff template |
| SDD-01 | Project Setup & Architecture | Monorepo skeleton, environment, architecture check |
| SDD-02 | Frontend Development | Product browsing and cart UI |
| SDD-03 | Backend & REST API | Running API and validation |
| SDD-04 | Database & Data Modeling (provisional) | MongoDB schemas and seed |
| SDD-05 | Authentication & Authorization (provisional) | Customer/admin login and access rules |
| SDD-06 | E-commerce Integration (provisional) | End-to-end cart and orders |
| SDD-07 | Testing & Quality (provisional) | Automated test baseline |
| SDD-08 | Git & GitHub Workflow (provisional) | Branch/PR process |
| SDD-09 | Docker & Compose (provisional) | Local container stack |
| SDD-10 | Linux & VPS (provisional) | Secured Ubuntu host |
| SDD-11 | Nginx, Domain & HTTPS (provisional) | Public HTTPS access |
| SDD-12 | CI/CD (provisional) | Automated build/test/deploy |
| SDD-13 | Monitoring, Logs & Backup (provisional) | Basic ops runbook and restore check |
| SDD-14 | Production Release & Review (provisional) | Final deployment and acceptance |

## 9. Learning contract
- 80% practice, 20% just-in-time theory.
- Every module: objective -> minimal explanation -> commands/code -> run/test -> troubleshoot -> handoff.
- Do not switch stacks, rename the repository, or start a second product without an explicit decision.
- Prefer a thin working vertical slice over exhaustive feature coverage.
- Explain command location, expected output, and verification steps.
- Never commit secrets; use `.env.example` with placeholder values.
- A module is complete only after exit criteria are demonstrated and PROGRESS.md is updated.

## 10. Change control
- Record any change to stack, scope, API, schema, or architecture in PROGRESS.md under Decisions.
- Specify reason, impacted modules, migration steps, and acceptance criteria.
- Future chats start by reading PROJECT_MASTER.md and PROGRESS.md (or a pasted handoff summary).
