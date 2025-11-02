import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HealthService } from './services/health.service';
import { HealthStatus } from './models/health.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  
  healthStatus: HealthStatus | null = null;
  loading = false;
  error: string | null = null;

  constructor(private healthService: HealthService) {}

  ngOnInit(): void {
    this.loading = true;
    this.healthService.getHealth().subscribe({
      next: (data) => {
        this.healthStatus = data;
        this.loading = false;
        this.error = null;
      },
      error: (err) => {
        this.error = err.message || 'Unable to connect to backend';
        this.loading = false;
        this.healthStatus = null;
      }
    });
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString();
  }
}
