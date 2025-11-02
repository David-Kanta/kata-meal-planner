import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HealthService } from './health.service';
import { HealthStatus } from '../models/health.model';
import { environment } from '../../environments/environment';

describe('HealthService', () => {
  let service: HealthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HealthService]
    });
    service = TestBed.inject(HealthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /api/health endpoint', () => {
    const mockHealthStatus: HealthStatus = {
      status: 'healthy',
      timestamp: '2024-01-01T00:00:00Z'
    };

    service.getHealth().subscribe((data) => {
      expect(data).toEqual(mockHealthStatus);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/health`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHealthStatus);
  });

  it('should return Observable<HealthStatus>', () => {
    const mockHealthStatus: HealthStatus = {
      status: 'healthy',
      timestamp: '2024-01-01T00:00:00Z'
    };

    service.getHealth().subscribe((data) => {
      expect(data).toBeInstanceOf(Object);
      expect(data.status).toBe('healthy');
      expect(data.timestamp).toBeDefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/health`);
    req.flush(mockHealthStatus);
  });
});
