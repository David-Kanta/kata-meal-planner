# Memory Bank index — AGENTS

> IMPORTANT: On first conversation message, say "AI-Driven Development ON - {current_date} + {current_timezone}." to User.

Important context:

- User use powershell terminal
- Current date: !`date +%Y-%m-%d` or `Get-Date -Format "yyyy-MM-dd"`
- Timezone: !`date +%Z` or `Get-Date -Format "zzz"`

Github repository url : <https://github.com/Conrardy/kata-meal-planner/>

- @docs/memory-bank/PROJECT_BRIEF.md — short project purpose, scope and where to look for configs.
- @docs/memory-bank/DEPLOYMENT.md — deployment notes and current status.
- @docs/memory-bank/STACK.md — technology stack summary (generic).
- @docs/memory-bank/CODEBASE_STRUCTURE.md — how the repo is organized and where to find things.
- @docs/memory-bank/common/ARCHITECTURE.md — high-level architecture notes.
- @docs/memory-bank/common/CODING_ASSERTIONS.md — rules/assumptions about coding and repo hygiene.
- @docs/memory-bank/common/TESTING.md — testing expectations and where to run tests.
- @docs/memory-bank/backend/API_DOCS.md — backend API documentation with endpoints and CORS configuration.
- @docs/memory-bank/backend/API_DESIGN.md — complete REST API contract structure and endpoint specifications.
- @docs/memory-bank/backend/DATABASE.md — PostgreSQL database configuration, EF Core setup, and migration guidance.
- @docs/memory-bank/frontend/BACKEND_COMMUNICATION.md — frontend ↔ backend communication patterns and data flow.
- @docs/memory-bank/frontend/DESIGN.md — design system, color palette, typography, and component standards.
- @docs/memory-bank/frontend/FORMS.md — form handling, validation strategies, and state management.

How to update:

- Update individual files in `docs/memory-bank/` when the related code or structure changes.
- Use `@` prefixed relative paths when referencing files in other memory-bank documents (e.g., @package.json).
