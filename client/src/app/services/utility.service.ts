import { Injectable, Inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UtilityService {
    // curPage is used to know the current page to highlight current menu Item  
    curPage = signal<string | null>(null);
      
      constructor(
        private router: Router,
      ) {
        this.router.events
          .pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)
          )
          .subscribe(event => {
            // console.log('Route changée :', event.urlAfterRedirects);
            this.curPage.set(event.urlAfterRedirects);
          });
      }


    /**
   * jumps to main-content anchor and focus on it
   */
    public gotoMainContent() {
        const el = document.querySelector<HTMLAnchorElement>('[name="main-content"]');
        el?.focus();
        document.documentElement.scrollTop = 0;
    }
}
