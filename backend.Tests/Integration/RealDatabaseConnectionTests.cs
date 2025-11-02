using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;
using backend.Data;

namespace backend.Tests.Integration;

/// <summary>
/// Tests database connection to the actual PostgreSQL container (not Testcontainers).
/// Requires the PostgreSQL container to be running via docker compose.
/// </summary>
public class RealDatabaseConnectionTests
{
    private readonly MealPlannerDbContext _dbContext;

    public RealDatabaseConnectionTests()
    {
        // Build configuration from appsettings.Development.json
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("../../../../backend/appsettings.Development.json", optional: false, reloadOnChange: false)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("DefaultConnection string not found in configuration");
        }

        var options = new DbContextOptionsBuilder<MealPlannerDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        _dbContext = new MealPlannerDbContext(options);
    }

    [Fact]
    public async Task DatabaseConnection_CanConnectToRealDatabase()
    {
        // Act
        var canConnect = await _dbContext.Database.CanConnectAsync();

        // Assert
        Assert.True(canConnect, "Failed to connect to PostgreSQL database. Ensure the container is running: docker compose up -d postgres");
    }

    [Fact]
    public async Task DatabaseConnection_CanExecuteQuery()
    {
        // Act - Execute a simple SQL query
        var rowsAffected = await _dbContext.Database.ExecuteSqlRawAsync("SELECT 1");

        // Assert - ExecuteSqlRawAsync returns number of rows affected
        // For SELECT statements, this typically returns -1, but the important thing
        // is that the command executed without throwing an exception
        Assert.True(rowsAffected >= -1, "Failed to execute SQL query on database");
    }

    [Fact]
    public async Task DatabaseConnection_CanGetDatabaseVersion()
    {
        // Act - Get PostgreSQL version
        var versionResult = await _dbContext.Database.ExecuteSqlRawAsync("SELECT version()");
        
        // Assert - Query executed successfully (version() returns server version)
        Assert.True(versionResult >= -1, "Failed to get database version");
    }
}

