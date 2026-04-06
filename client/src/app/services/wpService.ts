import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export interface Page {
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class WpService {
  private pageSubject = new BehaviorSubject<Page | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<any>(null);
  allPages: Page[] = [];

  // Expose as observables for component signals
  page$ = this.pageSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  // readonly apiUrl = 'mock/wp-allpages.json';
  readonly apiUrl = `${environment.apiUrl}/wp-pages`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const base = isPlatformServer(this.platformId)
      ? 'http://localhost:3000/api'
      : environment.apiUrl;
    this.apiUrl = `${base}/wp-pages`;
  }


  loadBySlug(slug: string): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    if (this.allPages.length) {
      this._setPage(slug);
    } else {
      this.http.get<Page[]>(`${this.apiUrl}?slug=${slug}`).pipe(
        tap((res: Page[]) => {
          this.allPages = res;
          this._setPage(slug);
        }),
        catchError(err => {
          this.errorSubject.next(`Pas de réponse du serveur !`);
          throw err;
        }),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe();
    }
  }

  private _setPage(slug: string) {
    const pageContent = this.allPages.find(p => p.slug === slug);

    if (pageContent) {
      this.pageSubject.next(pageContent);
    } else {
      // IMPORTANT : ne pas bloquer le composant
      this.pageSubject.next(null);
      this.errorSubject.next(`Page ${slug} introuvable`);
    }

    this.loadingSubject.next(false);
  }

}

