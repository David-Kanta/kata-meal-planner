# Database Context and Migrations

## DbContext

The `MealPlannerDbContext` is configured and ready for migrations. It currently has no entities, but the structure is in place to add domain models as needed.

## Migration Strategy

### Creating Migrations

When adding new entities or modifying existing ones:

```bash
cd backend
dotnet ef migrations add <MigrationName>
```

Example:
```bash
dotnet ef migrations add AddRecipeEntity
```

### Applying Migrations

To apply migrations to the database:

```bash
dotnet ef database update
```

### Reverting Migrations

To revert the last migration:

```bash
dotnet ef database update <PreviousMigrationName>
```

## Connection String

The connection string is configured in `appsettings.Development.json`:

```
Host=localhost;Port=5432;Database=mealplanner_dev;Username=mealplanner;Password=mealplanner_dev_password
```

## Adding Entities

1. Create entity class in `backend/Models/` or appropriate domain folder
2. Add `DbSet<T>` property to `MealPlannerDbContext`
3. Configure entity in `OnModelCreating` if needed (Fluent API)
4. Create migration: `dotnet ef migrations add <Name>`
5. Apply migration: `dotnet ef database update`

## Testing

For integration tests, use Testcontainers.PostgreSql (already configured in `backend.Tests`).

