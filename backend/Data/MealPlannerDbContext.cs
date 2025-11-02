using Microsoft.EntityFrameworkCore;

namespace backend.Data;

/// <summary>
/// Database context for the Meal Planner application.
/// Ready for migrations. Domain entities will be added as needed.
/// </summary>
public class MealPlannerDbContext : DbContext
{
    public MealPlannerDbContext(DbContextOptions<MealPlannerDbContext> options)
        : base(options)
    {
    }

    // DbSets will be added here as domain models are implemented
    // Example:
    // public DbSet<Recipe> Recipes { get; set; }
    // public DbSet<MealPlan> MealPlans { get; set; }
    // public DbSet<Ingredient> Ingredients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Entity configurations will be added here using Fluent API
        // Example:
        // modelBuilder.Entity<Recipe>().HasKey(r => r.Id);
        // modelBuilder.Entity<Recipe>().Property(r => r.Name).IsRequired().HasMaxLength(200);
    }
}

