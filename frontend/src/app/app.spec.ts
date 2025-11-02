import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { App } from './app';
import { HealthService } from './services/health.service';
import { of, throwError, delay } from 'rxjs';
import { HealthStatus } from './models/health.model';

describe('App', () => {
  let healthService: jasmine.SpyObj<HealthService>;

  beforeEach(async () => {
    const healthServiceSpy = jasmine.createSpyObj('HealthService', ['getHealth']);
    // Provide default return value to prevent errors in tests that don't explicitly set it
    healthServiceSpy.getHealth.and.returnValue(of({ status: 'healthy', timestamp: '2024-01-01T00:00:00Z' }));

    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule],
      providers: [
        { provide: HealthService, useValue: healthServiceSpy }
      ]
    }).compileComponents();

    healthService = TestBed.inject(HealthService) as jasmine.SpyObj<HealthService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend');
  });

  it('should render Angular logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('.angular-logo');
    expect(logo).toBeTruthy();
    expect(logo?.tagName.toLowerCase()).toBe('svg');
  });

  it('should render main content container', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const main = compiled.querySelector('main');
    expect(main).toBeTruthy();
    expect(main?.classList.contains('main')).toBe(true);
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should display congratulations message', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Find the paragraph in the left-side div, not the health status
    const leftSide = compiled.querySelector('.left-side');
    expect(leftSide).toBeTruthy();
    const paragraph = leftSide?.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toContain('Congratulations');
  });

  describe('Health Status', () => {
    it('should call getHealth on init', () => {
      healthService.getHealth.and.returnValue(of({ status: 'healthy', timestamp: '2024-01-01T00:00:00Z' }));

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      expect(healthService.getHealth).toHaveBeenCalled();
    });

    it('should display loading state initially', (done) => {
      // Use a delayed observable to test loading state
      const mockHealthStatus: HealthStatus = { status: 'healthy', timestamp: '2024-01-01T00:00:00Z' };
      healthService.getHealth.and.returnValue(
        of(mockHealthStatus).pipe(delay(200))
      );

      const fixture = TestBed.createComponent(App);
      // Don't call detectChanges yet - check initial state
      const app = fixture.componentInstance;
      
      // Call ngOnInit manually to set loading to true
      app.ngOnInit();
      expect(app.loading).toBe(true);
      
      // Now detect changes to render the loading state
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const loadingElement = compiled.querySelector('.health-loading');
      expect(loadingElement).toBeTruthy();
      expect(loadingElement?.textContent).toContain('Checking backend health');
      
      // Wait for observable to complete
      setTimeout(() => {
        fixture.detectChanges();
        expect(app.loading).toBe(false);
        done();
      }, 250);
    });

    it('should display health status after successful API call', () => {
      const mockHealthStatus: HealthStatus = {
        status: 'healthy',
        timestamp: '2024-01-01T12:00:00Z'
      };
      healthService.getHealth.and.returnValue(of(mockHealthStatus));

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const app = fixture.componentInstance;
      expect(app.loading).toBe(false);
      expect(app.error).toBeNull();
      expect(app.healthStatus).toEqual(mockHealthStatus);

      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const successElement = compiled.querySelector('.health-success');
      expect(successElement).toBeTruthy();
      expect(successElement?.textContent).toContain('healthy');
    });

    it('should display error message on API failure', () => {
      const mockError = { message: 'Network error' };
      healthService.getHealth.and.returnValue(throwError(() => mockError));

      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();

      const app = fixture.componentInstance;
      expect(app.loading).toBe(false);
      expect(app.error).toBe('Network error');
      expect(app.healthStatus).toBeNull();

      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const errorElement = compiled.querySelector('.health-error');
      expect(errorElement).toBeTruthy();
      expect(errorElement?.textContent).toContain('Unable to connect to backend');
    });

    it('should format timestamp correctly', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      const timestamp = '2024-01-01T12:00:00Z';
      const formatted = app.formatTimestamp(timestamp);
      expect(formatted).toBeDefined();
      expect(typeof formatted).toBe('string');
    });
  });
});
