# Deviations from SETUP_GUIDE.md

This document lists deviations from the original SETUP_GUIDE.md that occurred during the actual project setup.

## Tailwind CSS Version

**SETUP_GUIDE.md**: `tailwindcss@latest`

**Actual Implementation**: `tailwindcss@3.4.18` (was initially downgraded to v3.4.0 for compatibility, then updated)

**Reason**: Latest version had compatibility issues during initial setup. The current version (3.4.18) works correctly.

**Impact**: None - functionality is the same, version is still recent and stable.

## Playwright Configuration

**SETUP_GUIDE.md**: Basic Playwright configuration with single webServer for frontend only.

**Actual Implementation**: Extended `playwright.config.ts` to include both frontend and backend webServers:

```typescript
webServer: [
  {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  {
    command: process.platform === 'win32' 
      ? 'dotnet run --project ../backend/backend.csproj'
      : 'cd ../backend && dotnet run',
    url: 'http://localhost:5000/api/health',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    cwd: process.cwd(),
  },
],
```

**Reason**: Required for full-stack E2E tests that verify frontend-backend integration. Allows Playwright to automatically start both servers before running tests.

**Impact**: Positive - enables automated full-stack testing without manual server startup.

## Node.js Version

**SETUP_GUIDE.md**: Node.js v20.x LTS

**Actual Implementation**: Node.js v24.6.0 was used

**Reason**: Newer version was available and compatible. Backward compatible with v20.x requirements.

**Impact**: None - Angular 20 and all tools work correctly with v24.6.0.

## .NET SDK Version

**SETUP_GUIDE.md**: .NET SDK v8.0+

**Actual Implementation**: .NET SDK v10.0.100-preview.7.25380.108 was used

**Reason**: Preview version was available and compatible with .NET 8.0 requirements.

**Impact**: None - ASP.NET Core 8 projects build and run correctly. Note: Preview versions may have different behavior, but no issues encountered.

## E2E Test Structure

**SETUP_GUIDE.md**: Basic E2E test structure

**Actual Implementation**: Added E2E test for backend API integration (`should call backend health endpoint`)

**Reason**: Required for Phase 4 full-stack integration verification.

**Impact**: Positive - verifies end-to-end integration between frontend and backend.

## Summary

All deviations are either:
- **Version differences** (compatible newer versions)
- **Enhancements** (additional functionality like full-stack E2E testing)
- **No negative impact** on functionality or setup process

The setup process remains functional and follows the same general flow as SETUP_GUIDE.md.

