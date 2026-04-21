import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

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

  ngOnInit() {
    // SSR-safe : on ne fait l'appel que côté navigateur
    if (typeof window === 'undefined') return;

    this.http.get<StatEntry[]>(environment.apiUrl + '/stats').subscribe({
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

