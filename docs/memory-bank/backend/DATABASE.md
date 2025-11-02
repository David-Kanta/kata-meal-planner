# Database

## Information

- **Schema path**: EF Core migrations (to be created when DbContext is configured)
- **Type**: PostgreSQL 16
- **ORM/Driver**: Entity Framework Core 8 with Npgsql.EntityFrameworkCore.PostgreSQL 8.0.0
- **Connection**: Connection string in @backend/appsettings.Development.json
  - Host: localhost
  - Port: 5432
  - Database: mealplanner_dev
  - Username: mealplanner
  - Password: mealplanner_dev_password

## Main entities and relationships

No entities defined yet. DbContext to be created when domain models are implemented.

## Migrations

- **Migration tool**: EF Core Migrations - `dotnet ef migrations add <name>`
- **Commands**: `dotnet ef migrations add`, `dotnet ef database update`
- **Location**: Migrations folder (to be created in @backend/ when DbContext is set up)

## Seeding

Not configured yet. Seeding data to be added when domain models are created.

## Testing

- **Mock tool**: Testcontainers.PostgreSql 3.10.0 - Available in @backend.Tests/ for integration tests
