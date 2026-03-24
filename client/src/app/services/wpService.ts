import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  readonly apiUrl = `${environment.apiUrl}/api/wp-pages`;

  constructor(private http: HttpClient) { }

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
    const errorMessage: string = `Page: ${slug} not found !`;
    const pageContent: Page = this.allPages.filter((page: Page) => page.slug === slug)[0];
    if (pageContent) {
      this.pageSubject.next(pageContent);
      this.loadingSubject.next(false);
    } else {
      this.errorSubject.next(errorMessage);
      this.loadingSubject.next(false);
    }
  }
}

