# Codebase Structure

- Top-level layout:
  - @aidd/: prompts, templates, and agent guidance
  - @docs/: documentation and agents
  - @frontend/: Angular 20 frontend application (@frontend/package.json)
  - @backend/: ASP.NET Core 8 backend API (@backend/backend.csproj)
  - @backend.Tests/: xUnit test project (@backend.Tests/backend.Tests.csproj)
  - @README.md: project entry
  - @docker-compose.yml: PostgreSQL database container configuration
- How modules map to files: use `@aidd/prompts/` for prompt templates; docs live under `@docs/`.
- Where to find tests: @backend.Tests/ for backend tests, @frontend/ for frontend tests (Angular test scripts in @frontend/package.json).
- Database: PostgreSQL 16 configured in @docker-compose.yml (port 5432, database: mealplanner_dev)
- Frontend: Angular 20 standalone components, Tailwind CSS, Playwright E2E tests
- Backend: ASP.NET Core 8 Web API, EF Core, CORS configured for Angular app
- Quick navigation: update this file when moving major folders.
