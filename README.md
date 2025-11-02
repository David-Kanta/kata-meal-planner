# Kata Meal Planner

A full-stack meal planning application built with Angular 20 frontend and ASP.NET Core 8 backend.

## Tech Stack

- **Frontend**: Angular 20 with Tailwind CSS
- **Backend**: ASP.NET Core 8 Web API
- **Database**: PostgreSQL 16 (via Docker)
- **Testing**: Playwright (E2E), xUnit + Testcontainers (Backend)

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** v20.x+ ([Download](https://nodejs.org/))
  - Verify: `node --version` (should show v20.x or higher)
  - Includes npm package manager

- **.NET SDK** v8.0+ ([Download](https://dotnet.microsoft.com/download))
  - Verify: `dotnet --version` (should show 8.0.x or higher)

- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
  - Required for PostgreSQL database
  - Verify: `docker --version` and `docker compose version`
  - **Important**: Docker Desktop must be running before starting the database

- **Git** ([Download](https://git-scm.com/downloads))
  - Verify: `git --version`

## First-Time Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Conrardy/kata-meal-planner.git
cd kata-meal-planner
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. Install Backend Dependencies

```bash
cd backend
dotnet restore
cd ..
```

**Note**: These steps are only needed once. Skip to "Running the Application" for subsequent runs.

## Running the Application

### Step 1: Start PostgreSQL Database

Ensure Docker Desktop is running, then start the database:

```bash
docker compose up -d postgres
```

Verify the container is running:

```bash
docker ps --filter "name=mealplanner-postgres"
```

Expected output should show `mealplanner-postgres` container with status "Up".

**Troubleshooting**: If the container fails to start, check Docker Desktop is running and review logs:

```bash
docker logs mealplanner-postgres
```

### Step 2: Start Backend API

Open a terminal and run:

```bash
cd backend
dotnet run
```

Wait for the message: `Now listening on: http://localhost:5000`

The backend API is now available at `http://localhost:5000`

**Verify**: Open `http://localhost:5000/api/health` in your browser or run:

```bash
curl http://localhost:5000/api/health
```

### Step 3: Start Frontend Application

Open a **new terminal** (keep backend running) and run:

```bash
cd frontend
npm start
```

Wait for the message: `Application bundle generation complete.`

The frontend will automatically open at `http://localhost:4200`

**Note**: If the browser doesn't open automatically, navigate to `http://localhost:4200` manually.

### All Services Running

You should now have:

- ✅ PostgreSQL running in Docker (port 5432)
- ✅ Backend API running (port 5000)
- ✅ Frontend app running (port 4200)

## Running Tests

### Backend Tests

Run all backend tests (unit + integration):

```bash
cd backend.Tests
dotnet test
```

Run with verbose output:

```bash
dotnet test --verbosity normal
```

Run specific test class or method:

```bash
dotnet test --filter "FullyQualifiedName~TestClassName"
```

**Note**: Integration tests use Testcontainers and require Docker to be running.

### Frontend Tests

#### Unit Tests (Karma/Jasmine)

```bash
cd frontend
npm test
```

Run tests in watch mode (recommended during development):

```bash
npm test -- --watch
```

#### E2E Tests (Playwright)

**Prerequisites**: Both backend and frontend servers must be running (see "Running the Application" above).

Run all E2E tests:

```bash
cd frontend
npx playwright test
```

Run tests in headed mode (see browser):

```bash
npx playwright test --headed
```

Run specific test file:

```bash
npx playwright test tests/example.spec.ts
```

Open Playwright test report:

```bash
npx playwright show-report
```

**Note**: Playwright is configured to automatically start both servers if they're not running. However, it's recommended to start them manually for faster test execution.

### Running All Tests

To run all tests (backend + frontend E2E):

**Terminal 1** - Start database and backend:

```bash
docker compose up -d postgres
cd backend
dotnet run
```

**Terminal 2** - Start frontend:

```bash
cd frontend
npm start
```

**Terminal 3** - Run tests:

```bash
# Backend tests
cd backend.Tests
dotnet test

# Frontend E2E tests (in new terminal or after backend tests complete)
cd ../frontend
npx playwright test
```

## Project Structure

```
kata-meal-planner/
├── frontend/          # Angular 20 application
├── backend/           # ASP.NET Core 8 Web API
├── backend.Tests/     # Backend unit and integration tests
├── docs/             # Documentation
│   ├── SETUP_GUIDE.md    # Detailed setup guide
│   ├── DEVIATIONS.md      # Deviations from setup guide
│   └── plans/            # Implementation plans
└── docker-compose.yml # PostgreSQL container configuration
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Configuration

### Database Connection

Backend connection string is configured in `backend/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=mealplanner_dev;Username=mealplanner;Password=mealplanner_dev_password"
  }
}
```

### Frontend API URL

Frontend API URL is configured in `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## Development

### Development Workflow

1. **Start database**: `docker compose up -d postgres`
2. **Start backend**: `cd backend && dotnet run` (runs in watch mode automatically)
3. **Start frontend**: `cd frontend && npm start` (runs in watch mode automatically)
4. Make changes - both servers will auto-reload

### Stopping Services

Stop frontend: Press `Ctrl+C` in the frontend terminal

Stop backend: Press `Ctrl+C` in the backend terminal

Stop database:

```bash
docker compose down
```

Or stop and remove volumes (⚠️ deletes all data):

```bash
docker compose down -v
```

### Database Migrations

When ready to add database migrations:

```bash
cd backend
dotnet ef migrations add MigrationName
dotnet ef database update
```

**Note**: Ensure PostgreSQL container is running before running migrations.

### Viewing Database

Connect to PostgreSQL using Docker:

```bash
docker exec -it mealplanner-postgres psql -U mealplanner -d mealplanner_dev
```

Exit PostgreSQL: Type `\q` and press Enter

## Troubleshooting

### Database Connection Issues

**Error**: `could not connect to server`

**Solutions**:

1. Verify Docker is running: `docker ps`
2. Verify PostgreSQL container is running: `docker ps --filter "name=mealplanner-postgres"`
3. Restart container: `docker compose restart postgres`
4. Check logs: `docker logs mealplanner-postgres`

### Port Already in Use

**Error**: Port 4200, 5000, or 5432 already in use

**Solutions**:

- **Windows**: Find process: `netstat -ano | findstr :5000`, then kill: `taskkill /PID <pid> /F`
- **Linux/Mac**: Find process: `lsof -i :5000`, then kill: `kill -9 <pid>`
- Or change ports in configuration files

### Frontend Build Errors

**Error**: `ng: command not found`

**Solution**: Install Angular CLI globally:

```bash
npm install -g @angular/cli@20
```

**Error**: `Cannot find module` or dependency errors

**Solution**: Reinstall dependencies:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Backend Build Errors

**Error**: `dotnet: command not found`

**Solution**: Install .NET SDK 8.0+ and ensure it's in your PATH

**Error**: NuGet package restore fails

**Solution**: Clear NuGet cache and restore:

```bash
cd backend
dotnet nuget locals all --clear
dotnet restore
```

### Test Failures

**E2E Tests**: Ensure both backend and frontend are running before executing tests

**Integration Tests**: Ensure Docker is running (required for Testcontainers)

**All Tests**: Check logs for specific error messages and verify prerequisites are met

## Useful Commands

### Database

```bash
# Start database
docker compose up -d postgres

# Stop database
docker compose down

# View database logs
docker logs mealplanner-postgres

# Connect to database
docker exec -it mealplanner-postgres psql -U mealplanner -d mealplanner_dev

# Reset database (⚠️ deletes all data)
docker compose down -v
docker compose up -d postgres
```

### Backend

```bash
# Run backend
cd backend
dotnet run

# Run tests
cd backend.Tests
dotnet test

# Build release
cd backend
dotnet build -c Release
```

### Frontend

```bash
# Start development server
cd frontend
npm start

# Run unit tests
npm test

# Run E2E tests
npx playwright test

# Build for production
npm run build
```

## License

[Add your license here]
