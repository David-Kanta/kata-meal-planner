# Architecture

- Purpose: Explain high-level structure and responsibilities.
- Layers:
  - Documentation & prompts: @aidd/
  - Project docs: @docs/
  - Root configs: @README.md, @docker-compose.yml
  - Infrastructure: PostgreSQL database container (planned: frontend/backend apps)
- Data flows: user -> prompts in @aidd/prompts -> developer tools.
- Infrastructure: PostgreSQL 16 via Docker Compose for local development.
- Evolution notes: update when adding backend services or frontend apps.
