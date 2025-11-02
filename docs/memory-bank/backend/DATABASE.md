# Database

## Information

- **Schema path**: EF Core migrations (to be created when entities are added)
- **Type**: PostgreSQL 16
- **ORM/Driver**: Entity Framework Core 8 with Npgsql.EntityFrameworkCore.PostgreSQL 8.0.0
- **Connection**: Connection string in @backend/appsettings.Development.json
  - Host: localhost
  - Port: 5432
  - Database: mealplanner_dev
  - Username: mealplanner
  - Password: mealplanner_dev_password
- **DbContext**: MealPlannerDbContext in @backend/Data/MealPlannerDbContext.cs - Ready for migrations, no entities yet

## Main entities and relationships

No entities defined yet. DbContext structure ready in @backend/Data/MealPlannerDbContext.cs. Domain models will be added as DbSets when implemented.

## Migrations

- **Migration tool**: EF Core Migrations - `dotnet ef migrations add <name>`
- **Commands**: `dotnet ef migrations add`, `dotnet ef database update`
- **Location**: Migrations folder (to be created in @backend/ when first migration is added)

## Seeding

Not configured yet. Seeding data to be added when domain models are created.

## Testing

- **Mock tool**: Testcontainers.PostgreSql 3.10.0 - Available in @backend.Tests/ for integration tests
