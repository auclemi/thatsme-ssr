import { Component, OnInit, inject, Optional, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { isPlatformServer } from '@angular/common';

interface StatEntry {
  uid: string;
  path: string;
  ts: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class StatsComponent implements OnInit {
  private http = inject(HttpClient);

  stats: StatEntry[] = [];
  loading = true;
  error = false;
  apiUrl: string;

constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject('API_URL') private serverApiUrl: string
  ) {
    const base = isPlatformServer(this.platformId)
      ? `${this.serverApiUrl || 'http://localhost:3100'}/api`
      : environment.apiUrl;
    this.apiUrl = `${base}/stats`;
  }
  ngOnInit() {
    this.http.get<StatEntry[]>(this.apiUrl).subscribe({
      next: (data) => {
        // tri du plus récent au plus ancien
        this.stats = data.sort((a, b) => b.ts - a.ts);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  formatDate(ts: number) {
    return new Date(ts).toLocaleString('fr-FR');
  }
}
