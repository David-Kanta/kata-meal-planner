# Deployment

## Containerization

- **Docker Compose**: @docker-compose.yml configured for local development
- **PostgreSQL Container**: 
  - Image: postgres:16
  - Port: 5432
  - Database: mealplanner_dev
  - User: mealplanner
  - Health check: pg_isready every 10s
  - Volume: postgres_data for data persistence

## Local Development

- **Database**: Start with `docker-compose up -d` to run PostgreSQL container
- **Target**: Local development (no cloud deployment configured)
- **How to run locally**: use project README scripts (@README.md) to run tests and scripts
- **Secrets**: Database credentials in @docker-compose.yml (dev only), use env vars for production

## CI/CD Pipeline

- **CI**: None detected. If added, reference @.github/workflows/*
