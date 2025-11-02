using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;
using backend.Data;

namespace backend.Tests.Integration;

/// <summary>
/// Tests database connection from backend using the actual connection string from appsettings.Development.json
/// This verifies that the backend can connect to the PostgreSQL container running via Docker Compose.
/// </summary>
public class DatabaseConnectionFromBackendTests : IDisposable
{
    private readonly MealPlannerDbContext _dbContext;
    private readonly IConfiguration _configuration;

    public DatabaseConnectionFromBackendTests()
    {
        // Load configuration from appsettings.Development.json
        // Path relative to test project: backend.Tests -> backend (sibling directory)
        var testProjectDir = AppContext.BaseDirectory;
        // Navigate from bin/Debug/net8.0 to project root, then to backend
        var projectRoot = Path.GetFullPath(Path.Combine(testProjectDir, "..", "..", "..", ".."));
        var backendPath = Path.Combine(projectRoot, "backend");
        
        _configuration = new ConfigurationBuilder()
            .SetBasePath(backendPath)
            .AddJsonFile("appsettings.Development.json", optional: false, reloadOnChange: true)
            .Build();

        var connectionString = _configuration.GetConnectionString("DefaultConnection");
        
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("DefaultConnection string not found in configuration");
        }

        var options = new DbContextOptionsBuilder<MealPlannerDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        _dbContext = new MealPlannerDbContext(options);
    }

    public void Dispose()
    {
        _dbContext?.Dispose();
    }

    [Fact]
    public async Task DatabaseConnection_CanConnectToPostgreSQL()
    {
        // Act
        var canConnect = await _dbContext.Database.CanConnectAsync();

        // Assert
        Assert.True(canConnect, "Backend should be able to connect to PostgreSQL container");
    }

    [Fact]
    public async Task DatabaseConnection_CanExecuteQuery()
    {
        // Act - Execute a simple SQL query to verify connection works
        var result = await _dbContext.Database.ExecuteSqlRawAsync("SELECT 1");

        // Assert - ExecuteSqlRawAsync returns number of rows affected
        // For SELECT statements, this typically returns -1, but the important thing
        // is that the command executed without throwing an exception
        Assert.True(result >= -1, "Query should execute successfully");
    }

    [Fact]
    public async Task DatabaseConnection_CanVerifyDatabaseExists()
    {
        // Act
        var databaseExists = await _dbContext.Database.CanConnectAsync();

        // Assert
        Assert.True(databaseExists, "Database should exist and be accessible");
    }
}

