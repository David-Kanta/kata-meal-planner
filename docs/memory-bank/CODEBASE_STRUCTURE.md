# Codebase Structure

- Top-level layout:
  - @aidd/: prompts, templates, and agent guidance
  - @docs/: documentation and agents
  - @README.md: project entry
  - @docker-compose.yml: PostgreSQL database container configuration
  - other folders: project-specific sources when present
- How modules map to files: use `@aidd/prompts/` for prompt templates; docs live under `@docs/`.
- Where to find tests: search for test folders or `package.json` scripts (@package.json).
- Database: PostgreSQL 16 configured in @docker-compose.yml (port 5432, database: mealplanner_dev)
- Quick navigation: update this file when moving major folders.
