# Tactical Implementation Plan: Display Backend Health Status

## Problem Confirmation

**Confirming**: "Display backend health status in Angular app — create HTTP service, model, and component to demonstrate backend communication pattern following BACKEND_COMMUNICATION.md."

## Comprehension Summary

- **Scope**: Create Angular service using HttpClient, TypeScript model/interface, and component to display health status from `/api/health` endpoint.
- **Dependencies**: Backend health endpoint exists at `/api/health`, CORS configured, environment.ts has API URL. Frontend Angular app initialized.
- **Risk**: Low risk — endpoint exists and tested. Potential CORS issues if misconfigured.
- **Current State**: Backend returns `{ status: "healthy", timestamp: DateTime.UtcNow }`. Frontend has basic structure but no services/models yet.

## Normalized Items

### Feature

- Display backend health status in Angular app

## Acceptance Criteria

- [x] HTTP service created in `frontend/src/app/services/health.service.ts` using HttpClient
- [x] Service method `getHealth()` calls `GET /api/health` endpoint
- [x] TypeScript interface/model created in `frontend/src/app/models/health.model.ts` matching backend response
- [x] Component created to display health status (can be added to existing app component or new component)
- [x] Component displays status ("healthy") and timestamp
- [x] Component handles loading state while fetching
- [x] Component handles error state if API call fails
- [x] Service uses `environment.apiUrl` for base URL
- [x] HttpClient imported and provided in app config
- [x] Example demonstrates Angular Component → Service → HttpClient → Backend API pattern

## Implementation Plan

### Discovery

- [x] Review backend HealthController response structure (`{ status: string, timestamp: DateTime }`)
- [x] Verify `environment.ts` has `apiUrl: 'http://localhost:5000/api'`
- [x] Check if HttpClient is already provided in `app.config.ts`
- [x] Review Angular standalone component structure

### Design

- [x] Design Health model interface (`HealthStatus` with `status: string`, `timestamp: string`)
- [x] Design service method signature (`getHealth(): Observable<HealthStatus>`)
- [x] Design component UI (simple display with status badge/indicator)
- [x] Decide component location (update app component or create dedicated health component)

### Implementation

#### Step 1: Create Model (15min)

- [x] Create `frontend/src/app/models/health.model.ts`
- [x] Define `HealthStatus` interface with `status: string` and `timestamp: string`

#### Step 2: Create Service (30min)

- [x] Create `frontend/src/app/services/health.service.ts`
- [x] Import `HttpClient` and `Observable` from Angular
- [x] Import `environment` from `@environments/environment`
- [x] Import `HealthStatus` model
- [x] Create `HealthService` class with `providedIn: 'root'`
- [x] Inject `HttpClient` in constructor
- [x] Implement `getHealth(): Observable<HealthStatus>` method
- [x] Use `this.http.get<HealthStatus>(`${environment.apiUrl}/health`)`

#### Step 3: Provide HttpClient (15min)

- [x] Check `frontend/src/app/app.config.ts`
- [x] Add `provideHttpClient()` import from `@angular/common/http`
- [x] Add `provideHttpClient()` to providers array if not present

#### Step 4: Create/Update Component (45min)

- [x] Option A: Update `app.component.ts` to display health status
- [ ] Option B: Create `frontend/src/app/components/health-status/health-status.component.ts`
- [x] Import `HealthService` and `HealthStatus` model
- [x] Inject `HealthService` in constructor
- [x] Create properties: `healthStatus: HealthStatus | null = null`, `loading = false`, `error: string | null = null`
- [x] Implement `ngOnInit()` to call service
- [x] Subscribe to service observable with loading/error/success handling
- [x] Format timestamp for display (use Angular DatePipe or format manually)

#### Step 5: Create Component Template (30min)

- [x] Create/update component template (`.html` file)
- [x] Display loading state: "Checking backend health..."
- [x] Display error state: "Unable to connect to backend: {error}"
- [x] Display success state: Status badge/indicator + formatted timestamp
- [x] Use Tailwind CSS classes for styling (orange theme: #FF8C00)
- [x] Make it visually clear (green for healthy, red for error)

### Tests

- [x] Unit test: Service calls correct endpoint with HttpClient
- [x] Unit test: Service returns Observable<HealthStatus>
- [x] Unit test: Component displays loading state initially
- [x] Unit test: Component displays health status after successful API call
- [x] Unit test: Component displays error message on API failure
- [ ] E2E test: Health status displayed on page load (optional)

### Review

- [ ] Code review: Service follows Angular HTTP service patterns
- [ ] Code review: Component follows Angular standalone component patterns
- [ ] Review: Error handling implemented correctly
- [ ] Review: Follows BACKEND_COMMUNICATION.md data flow pattern
- [ ] Functional review: Health status displays correctly when backend is running
- [ ] Functional review: Error displays correctly when backend is down

### Release

- [ ] Document the example in BACKEND_COMMUNICATION.md or create example component reference
- [ ] Verify CORS works correctly (test with backend running)
- [ ] Verify displays correctly on both mobile and desktop views

## Parallelization Plan

**Safe to run in parallel:**

- Model creation and Service creation (model must exist before service uses it, but can be created in same session)
- Component creation independent once service exists

**Coordination points:**

- Ensure HttpClient is provided before service implementation
- Ensure model interface matches backend response structure
- Test requires both frontend and backend running

## Developer Task Breakdown

### P1 - Foundation (1h)

1. Create Health model interface (15min)
2. Create HealthService with HttpClient (30min)
3. Ensure HttpClient provided in app.config.ts (15min)

### P1 - Display (1h)

1. Create/update component with service integration (45min)
2. Create template with loading/error/success states (30min)
3. Style with Tailwind CSS (15min)

### P2 - Testing & Polish (1h)

1. Write unit tests for service (20min)
2. Write unit tests for component (30min)
3. Test with backend running/stopped (10min)

**Total estimated time: 2-3 hours**

## Implementation Details

### Health Model Structure

```typescript
// frontend/src/app/models/health.model.ts
export interface HealthStatus {
  status: string;
  timestamp: string; // ISO string from backend
}
```

### Service Pattern

```typescript
// frontend/src/app/services/health.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { HealthStatus } from '../models/health.model';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  constructor(private http: HttpClient) {}

  getHealth(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(`${environment.apiUrl}/health`);
  }
}
```

### Component Pattern

```typescript
// Component should:
// 1. Inject HealthService
// 2. Call getHealth() in ngOnInit()
// 3. Handle Observable with subscribe()
// 4. Manage loading/error/success states
// 5. Display formatted data in template
```

## Risks & Mitigations

- **Risk**: CORS error when calling backend  
  **Mitigation**: Verify CORS configuration in backend Program.cs allows `http://localhost:4200`

- **Risk**: HttpClient not provided  
  **Mitigation**: Check app.config.ts includes `provideHttpClient()` before service creation

- **Risk**: Backend not running causes confusing error  
  **Mitigation**: Implement clear error handling and user-friendly error messages

- **Risk**: Timestamp format mismatch  
  **Mitigation**: Use Angular DatePipe or format ISO string consistently

- **Risk**: Service called before component initialized  
  **Mitigation**: Use `ngOnInit()` lifecycle hook, not constructor

---

**Status**: Implementation complete. Unit tests written. Ready for review and functional testing. This task demonstrates the complete backend communication pattern: Component → Service → HttpClient → Backend API → Response.

**Implementation Summary**:
- ✅ Health model created (`frontend/src/app/models/health.model.ts`)
- ✅ HealthService created (`frontend/src/app/services/health.service.ts`)
- ✅ HttpClient provided in `app.config.ts`
- ✅ App component updated with health status display
- ✅ Template updated with loading/error/success states
- ✅ Unit tests created for service (`health.service.spec.ts`)
- ✅ Unit tests updated for component (`app.spec.ts`)
- ✅ Plan updated with progress

**Files Created**:
- `frontend/src/app/models/health.model.ts`
- `frontend/src/app/services/health.service.ts`
- `frontend/src/app/services/health.service.spec.ts`

**Files Modified**:
- `frontend/src/app/app.config.ts` (added `provideHttpClient()`)
- `frontend/src/app/app.ts` (added health status logic)
- `frontend/src/app/app.html` (added health status UI)
- `frontend/src/app/app.spec.ts` (added health status tests)
