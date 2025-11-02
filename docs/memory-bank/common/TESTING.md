# Testing Guidelines

## Tools and Frameworks

- **Frontend E2E**: Playwright 1.56 - Tests in @frontend/e2e/
- **Frontend Unit**: Jasmine/Karma - Angular default testing framework (@frontend/src/app/*.spec.ts)
- **Backend Unit**: xUnit 2.8 - Tests in @backend.Tests/Controllers/
- **Backend Integration**: 
  - Testcontainers.PostgreSql 3.10 - Tests in @backend.Tests/Integration/DatabaseConnectionTests.cs (isolated container)
  - Real database tests - Tests in @backend.Tests/Integration/RealDatabaseConnectionTests.cs (requires Docker container running)

## Testing Strategy

- **Approach**: Test-driven development for key features
- **Types of tests**:
  - **Unit Tests**: Component tests (Angular), controller tests (xUnit)
  - **Integration Tests**: 
    - Database connection tests with Testcontainers (isolated)
    - Real database connection tests (requires Docker container)
  - **End-to-End Tests**: Playwright tests for frontend user flows
  - **Performance Tests**: Not implemented yet
  - **Security Tests**: Not implemented yet

## Test Execution Process

- **Frontend unit tests**: `cd frontend && npm test` - Runs Jasmine/Karma tests
- **Frontend E2E tests**: `cd frontend && npx playwright test` - Runs Playwright tests
- **Backend tests**: `dotnet test` - Runs xUnit tests (unit and integration)
- **CI**: Not configured yet

## Mocking and Stubbing

- **Frontend**: Angular TestBed for component testing, HTTP mocking with HttpClientTestingModule
- **Backend**: 
  - WebApplicationFactory for API testing
  - Testcontainers for isolated database testing
  - Real database tests require Docker container running (`docker compose up -d postgres`)
