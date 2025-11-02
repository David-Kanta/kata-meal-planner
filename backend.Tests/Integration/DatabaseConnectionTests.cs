using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;
using Xunit;
using backend.Data;

namespace backend.Tests.Integration;

public class DatabaseConnectionTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgresContainer;
    private MealPlannerDbContext? _dbContext;

    public DatabaseConnectionTests()
    {
        _postgresContainer = new PostgreSqlBuilder()
            .WithImage("postgres:16")
            .WithDatabase("mealplanner_test")
            .WithUsername("testuser")
            .WithPassword("testpassword")
            .Build();
    }

    public async Task InitializeAsync()
    {
        await _postgresContainer.StartAsync();

        var connectionString = _postgresContainer.GetConnectionString();
        
        var options = new DbContextOptionsBuilder<MealPlannerDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        _dbContext = new MealPlannerDbContext(options);
        
        // Ensure database is created
        await _dbContext.Database.EnsureCreatedAsync();
    }

    public async Task DisposeAsync()
    {
        if (_dbContext != null)
        {
            await _dbContext.DisposeAsync();
        }
        await _postgresContainer.DisposeAsync();
    }

    [Fact]
    public async Task DatabaseConnection_CanConnect()
    {
        // Act
        var canConnect = await _dbContext!.Database.CanConnectAsync();

        // Assert
        Assert.True(canConnect);
    }

    [Fact]
    public async Task DatabaseConnection_CanExecuteQuery()
    {
        // Act - Execute a simple SQL query via ExecuteSqlRawAsync
        // This verifies the database connection is working
        var rowsAffected = await _dbContext!.Database.ExecuteSqlRawAsync("SELECT 1");

        // Assert - ExecuteSqlRawAsync returns number of rows affected
        // For SELECT statements, this typically returns -1, but the important thing
        // is that the command executed without throwing an exception
        Assert.True(rowsAffected >= -1); // Allow -1 for SELECT statements
    }
}
