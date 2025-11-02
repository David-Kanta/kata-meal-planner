# Tactical Implementation Plan: Meal Planner Project Setup

## Problem Confirmation

**Confirming**: "Set up Meal Planner project infrastructure — Angular 20 frontend, ASP.NET Core 8 backend, PostgreSQL database with Docker, and basic configuration — to enable feature development."

## Comprehension Summary

- **Scope**: Initialize frontend (Angular 20 + Tailwind CSS), backend (ASP.NET Core 8 + EF Core), database (PostgreSQL via Docker), testing infrastructure (Playwright + xUnit/Testcontainers), and development environment configuration.
- **Dependencies**: Node.js 20.x, .NET SDK 8.0+, Docker Desktop. Docker Compose already configured.
- **Risk**: Version mismatches, port conflicts, Docker connectivity issues. Low risk with clear setup steps.
- **Current State**: `docker-compose.yml` exists; frontend/backend projects not yet created.

## Normalized Items

### Technical Changes

- Create Angular 20 frontend project with Tailwind CSS
- Create ASP.NET Core 8 backend Web API project
- Configure PostgreSQL with Entity Framework Core
- Set up testing infrastructure (Playwright + xUnit/Testcontainers)
- Configure development environment files
- Implement CORS configuration
- Create basic health check endpoint

## Acceptance Criteria

### Frontend Setup

- [ ] Angular 20 project created with routing, standalone components, CSS styling
- [ ] Tailwind CSS installed and configured with custom theme (primary: #FF8C00, secondary: #FFD700)
- [ ] Tailwind directives added to `src/styles.css`
- [ ] `environment.ts` created with API URL configuration
- [ ] Playwright installed and configured for E2E testing
- [ ] Angular dev server starts successfully on port 4200

### Backend Setup

- [ ] ASP.NET Core 8 Web API project created with controllers
- [ ] PostgreSQL EF Core packages installed (Npgsql.EntityFrameworkCore.PostgreSQL 8.0.0)
- [ ] EF Core Design and Tools packages installed
- [ ] Testcontainers and xUnit packages installed for testing
- [ ] Test project (`backend.Tests`) created and references backend project
- [ ] `appsettings.Development.json` configured with PostgreSQL connection string
- [ ] CORS configured to allow Angular app on `http://localhost:4200`
- [ ] Health check endpoint available at `/api/health`
- [ ] Backend API starts successfully on port 5000

### Database Setup

- [ ] PostgreSQL container starts successfully via `docker compose up -d postgres`
- [ ] Database connection verified from backend
- [ ] Docker volume persists data correctly

### Verification

- [ ] Frontend unit tests run successfully (`npm test`)
- [ ] Backend unit tests run successfully (`dotnet test`)
- [ ] Integration tests with Testcontainers run successfully
- [ ] Playwright E2E tests configured and can run
- [ ] Full stack integration verified (frontend can call backend API)

## Implementation Plan

### Discovery

- [ ] Verify Node.js 20.x installed (`node --version`)
- [ ] Verify .NET SDK 8.0+ installed (`dotnet --version`)
- [ ] Verify Docker Desktop running (`docker ps`)
- [ ] Verify Docker Compose available (`docker compose version`)
- [ ] Check for port conflicts (4200, 5000, 5432)
- [ ] Review existing `docker-compose.yml` configuration

### Design

- [ ] Define frontend project structure (Angular standalone components)
- [ ] Define backend project structure (controllers, DbContext, models)
- [ ] Design database schema approach (EF Core migrations)
- [ ] Design API contract structure (REST endpoints)
- [ ] Define environment configuration approach

### Implementation

#### Frontend (6-8h)

- [ ] Install Angular CLI globally (`npm install -g @angular/cli@20`)
- [ ] Create Angular project (`ng new frontend --routing --style=css --standalone --skip-git`)
- [ ] Install Tailwind CSS dependencies (`npm install -D tailwindcss postcss autoprefixer`)
- [ ] Initialize Tailwind config (`npx tailwindcss init`)
- [ ] Configure `tailwind.config.js` with custom theme colors and spacing
- [ ] Add Tailwind directives to `src/styles.css`
- [ ] Create `src/environments/environment.ts` with API URL
- [ ] Install Playwright (`npm install -D @playwright/test`)
- [ ] Create `playwright.config.ts` with web server configuration
- [ ] Update `angular.json` if needed for Tailwind integration

#### Backend (6-8h)

- [ ] Create ASP.NET Core Web API project (`dotnet new webapi -n backend -f net8.0 --use-controllers --no-https`)
- [ ] Restore NuGet packages (`dotnet restore`)
- [ ] Install PostgreSQL EF Core package (`dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.0`)
- [ ] Install EF Core Design/Tools packages
- [ ] Install Testcontainers package (`dotnet add package Testcontainers.PostgreSql --version 3.10.0`)
- [ ] Install xUnit and testing packages
- [ ] Create test project (`dotnet new xunit -n backend.Tests -f net8.0`)
- [ ] Add project reference and test packages to test project
- [ ] Create `appsettings.Development.json` with connection string
- [ ] Configure CORS in `Program.cs` for Angular app
- [ ] Create basic health check endpoint (`/api/health`)
- [ ] Set up DbContext (empty for now, ready for migrations)

#### Database (2h)

- [ ] Start PostgreSQL container (`docker compose up -d postgres`)
- [ ] Verify container health (`docker ps`)
- [ ] Test database connection from backend
- [ ] Verify Docker volume creation

#### Testing Infrastructure (3-4h)

- [ ] Configure Playwright browsers (`npx playwright install`)
- [ ] Create basic Playwright test structure (`e2e/` directory)
- [ ] Create basic xUnit test structure in `backend.Tests`
- [ ] Create basic Testcontainers integration test example
- [ ] Verify all test runners work (`npm test`, `dotnet test`)

### Tests

- [ ] Unit test: Angular component renders
- [ ] Unit test: Backend health endpoint returns 200 OK
- [ ] Integration test: Backend connects to PostgreSQL via Testcontainers
- [ ] E2E test: Frontend loads and displays basic content
- [ ] E2E test: Frontend can call backend health endpoint

### Review

- [ ] Code review: Frontend structure follows Angular 20 best practices
- [ ] Code review: Backend structure follows ASP.NET Core 8 conventions
- [ ] Review: Environment configuration matches SETUP_GUIDE.md
- [ ] Review: All acceptance criteria met
- [ ] Functional review: Full stack runs locally without errors

### Release

- [ ] Document any deviations from SETUP_GUIDE.md
- [ ] Update README.md with setup instructions if needed
- [ ] Verify all verification steps from SETUP_GUIDE.md pass
- [ ] Tag commit as "initial-setup" if required

## Parallelization Plan

**Safe to run in parallel:**

- Frontend setup and backend setup (separate directories, no dependencies)
- Database container setup (independent infrastructure)
- Testing infrastructure setup (can proceed in parallel with main project setup)

**Coordination points:**

- Verify ports 4200 (frontend) and 5000 (backend) are available before starting
- Ensure Docker container is running before backend database connection tests
- Align API URL in frontend `environment.ts` with backend port configuration

## Developer Task Breakdown

### P1 - Infrastructure Setup (4h)

1. Verify prerequisites installed (30min)
2. Start PostgreSQL container and verify (30min)
3. Create backend project structure (1h)
4. Create frontend project structure (1h)
5. Basic configuration files (appsettings, environment.ts) (1h)

### P1 - Core Configuration (3h)

1. Configure Tailwind CSS in frontend (1h)
2. Configure CORS and basic endpoints in backend (1h)
3. Set up EF Core DbContext structure (1h)

### P2 - Testing Setup (3h)

1. Configure Playwright for frontend (1h)
2. Configure xUnit and Testcontainers for backend (1h)
3. Create basic test examples (1h)

### P2 - Verification (2h)

1. Run all verification steps from SETUP_GUIDE.md (1h)
2. Fix any configuration issues (1h)

**Total estimated time: 12-14 hours**

## Risks & Mitigations

- **Risk**: Angular CLI version mismatch  
  **Mitigation**: Use exact version `@angular/cli@20` and verify before project creation

- **Risk**: Port conflicts (4200, 5000, 5432)  
  **Mitigation**: Check ports before starting services, document alternative ports if needed

- **Risk**: Docker Desktop not running  
  **Mitigation**: Verify Docker status first, provide clear error messages

- **Risk**: .NET SDK version mismatch  
  **Mitigation**: Verify `dotnet --version` shows 8.0.x before proceeding

- **Risk**: Tailwind CSS configuration errors  
  **Mitigation**: Follow exact config from SETUP_GUIDE.md, verify content paths include component files

- **Risk**: CORS misconfiguration blocking frontend-backend communication  
  **Mitigation**: Test API calls from frontend immediately after setup, verify exact URL match

---

**Status**: Waiting for confirmation to proceed.
