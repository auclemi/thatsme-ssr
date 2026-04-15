import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class SkiplinkService {
    constructor(
    ) { }


    /**
   * jumps to main-content anchor and focus on it
   */
    public gotoMainContent() {
        const el = document.querySelector<HTMLAnchorElement>('[name="main-content"]');
        el?.focus();
        document.documentElement.scrollTop = 0;
    }
}
